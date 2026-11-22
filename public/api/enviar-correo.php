<?php
declare(strict_types=1);
require_once __DIR__ . '/config.php';
ini_set('display_errors', '0');
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
header('Vary: Origin');

function respond(int $status, bool $success, string $message): void
{
    http_response_code($status);
    echo json_encode(['success' => $success, 'message' => $message], JSON_UNESCAPED_UNICODE);
    exit;
}

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowedOrigins = ['https://puntosolarmexico.com', 'https://www.puntosolarmexico.com'];
if ($origin !== '' && !in_array($origin, $allowedOrigins, true)) {
    respond(403, false, 'Origen no permitido.');
}
if ($origin !== '') {
    header('Access-Control-Allow-Origin: ' . $origin);
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

$method = $_SERVER['REQUEST_METHOD'] ?? '';
if ($method === 'OPTIONS') {
    http_response_code(204);
    exit;
}
if ($method !== 'POST') {
    header('Allow: POST, OPTIONS');
    respond(405, false, 'Método no permitido.');
}

// En Hostinger: upload_max_filesize >= 10M y post_max_size >= 12M.
if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 12 * 1024 * 1024
    || (empty($_POST) && empty($_FILES) && (int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 0)) {
    respond(413, false, 'La solicitud está vacía o supera el tamaño permitido por el servidor.');
}

$fields = [];
foreach (['nombre' => 600, 'correo' => 254, 'telefono' => 25] as $key => $limit) {
    $value = $_POST[$key] ?? null;
    if (!is_string($value) || trim($value) === '' || strlen($value) > $limit
        || preg_match('//u', $value) !== 1 || preg_match('/[\x00-\x1F\x7F]/', $value)) {
        respond(422, false, 'Completa correctamente todos los campos.');
    }
    $fields[$key] = trim($value);
}
if (!filter_var($fields['correo'], FILTER_VALIDATE_EMAIL)) {
    respond(422, false, 'Ingresa un correo válido.');
}
$digits = preg_replace('/\D/', '', $fields['telefono']);
if (!preg_match('/^[+0-9(). -]+$/', $fields['telefono']) || strlen($digits) < 10 || strlen($digits) > 15) {
    respond(422, false, 'Ingresa un teléfono de entre 10 y 15 dígitos.');
}
$message = $_POST['mensaje'] ?? '';
if (!is_string($message) || strlen($message) > 2000
    || preg_match('//u', $message) !== 1 || preg_match('/[\x00-\x1F\x7F]/', $message)) {
    respond(422, false, 'El detalle del cálculo no es válido.');
}
$fields['mensaje'] = trim($message);
$paymentRange = $_POST['pago'] ?? '';
if (!in_array($paymentRange, ['8000', '10000', '15000', '40000'], true)
    && !($paymentRange === '' && $fields['mensaje'] !== '')) {
    respond(422, false, 'Selecciona un rango de pago válido.');
}
$fields['pago'] = $paymentRange;

try {
    $attachment = null;
    if (isset($_FILES['recibo'])) {
        $file = $_FILES['recibo'];
        if (!is_array($file) || !isset($file['error']) || !is_int($file['error'])) {
            respond(422, false, 'El archivo adjunto no es válido.');
        }
        if (in_array($file['error'], [UPLOAD_ERR_INI_SIZE, UPLOAD_ERR_FORM_SIZE], true)) {
            respond(413, false, 'El archivo supera el límite permitido por el servidor (máximo 10 MB).');
        }
        if ($file['error'] !== UPLOAD_ERR_NO_FILE) {
            if ($file['error'] !== UPLOAD_ERR_OK || !is_string($file['tmp_name'] ?? null)
                || !is_uploaded_file($file['tmp_name'])) {
                respond(422, false, 'No se pudo recibir el archivo. Intenta nuevamente.');
            }
            $size = filesize($file['tmp_name']);
            if ($size === false || $size === 0 || $size > 10 * 1024 * 1024) {
                respond(413, false, 'El archivo debe contener datos y pesar como máximo 10 MB.');
            }
            $mime = (new finfo(FILEINFO_MIME_TYPE))->file($file['tmp_name']);
            $types = ['application/pdf' => 'pdf', 'image/jpeg' => 'jpg', 'image/png' => 'png'];
            if (!isset($types[$mime])) {
                respond(422, false, 'Selecciona un archivo PDF, JPG o PNG válido.');
            }
            $contents = file_get_contents($file['tmp_name']);
            if ($contents === false) {
                throw new RuntimeException('No se pudo leer el adjunto.');
            }
            $attachment = ['mime' => $mime, 'name' => 'recibo-cfe.' . $types[$mime], 'data' => $contents];
        }
    }

    $safe = array_map(static function (string $value): string {
        return htmlspecialchars($value, ENT_QUOTES | ENT_SUBSTITUTE, 'UTF-8');
    }, $fields);
    $payment = number_format((int) $fields['pago']);
    $html = '<!doctype html><html lang="es"><head><meta charset="UTF-8"></head>'
        . '<body style="font-family:Roboto,Arial,sans-serif;color:#172d5b;background:#f9fafb;padding:24px">'
        . '<h1 style="color:#172d5b">Nueva solicitud de cotización</h1>'
        . '<table cellpadding="12" style="background:#ffffff;border-top:4px solid #f48020">'
        . '<tr><th align="left">Nombre</th><td>' . $safe['nombre'] . '</td></tr>'
        . '<tr><th align="left">Correo</th><td>' . $safe['correo'] . '</td></tr>'
        . '<tr><th align="left">Teléfono / WhatsApp</th><td>' . $safe['telefono'] . '</td></tr>'
        . ($fields['pago'] !== '' ? '<tr><th align="left">Pago bimestral CFE</th><td>Más de $' . $payment . ' MXN</td></tr>' : '')
        . ($fields['mensaje'] !== '' ? '<tr><th align="left">Detalle del cálculo</th><td>' . $safe['mensaje'] . '</td></tr>' : '')
        . '</table></body></html>';

    $boundary = '=_PuntoSolar_' . bin2hex(random_bytes(24));
    $headers = implode("\r\n", [
        'From: Punto Solar Mexico <contacto@puntosolarmexico.com>',
        'Reply-To: ' . $fields['correo'],
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    ]);
    $body = '--' . $boundary . "\r\n"
        . "Content-Type: text/html; charset=UTF-8\r\n"
        . "Content-Transfer-Encoding: base64\r\n\r\n"
        . chunk_split(base64_encode($html));
    if ($attachment !== null) {
        $body .= '--' . $boundary . "\r\n"
            . 'Content-Type: ' . $attachment['mime'] . "\r\n"
            . 'Content-Disposition: attachment; filename="' . $attachment['name'] . '"' . "\r\n"
            . "Content-Transfer-Encoding: base64\r\n\r\n"
            . chunk_split(base64_encode($attachment['data']));
    }
    $body .= '--' . $boundary . "--\r\n";

    if (!mail('contacto@puntosolarmexico.com', 'Nueva solicitud de cotizacion - Punto Solar Mexico', $body, $headers)) {
        throw new RuntimeException('El servidor no aceptó el correo.');
    }
    respond(200, true, 'Tu solicitud fue enviada. Pronto nos pondremos en contacto contigo.');
} catch (Throwable $error) {
    error_log('Punto Solar: fallo al procesar el correo (' . get_class($error) . ').');
    respond(500, false, 'No se pudo enviar la solicitud. Intenta nuevamente más tarde.');
}
