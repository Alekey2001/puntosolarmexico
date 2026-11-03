const steps = [
  ['Conocemos tu consumo', 'El recibo de luz es el punto de partida para entender tus necesidades.'],
  ['Evaluamos tu espacio', 'Revisamos las condiciones del sitio y el alcance de tu proyecto.'],
  ['Diseñamos tu propuesta', 'Definimos el sistema, la inversión y una estimación de generación.'],
  ['Planeamos la instalación', 'Acordamos contigo los siguientes pasos y el acompañamiento del proyecto.'],
];

export default function Proceso() {
  return (
    <section id="proceso" aria-labelledby="proceso-title" className="bg-white px-6 py-20 sm:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm font-bold uppercase tracking-widest">Paso a paso</p>
        <h2 id="proceso-title" className="mt-3 text-3xl font-bold sm:text-4xl">Tu camino hacia la energía solar.</h2>
        <ol className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(([title, description], index) => (
            <li key={title} className="border-t-4 border-accent pt-6">
              <span className="text-4xl font-bold text-primary/40">0{index + 1}</span>
              <h3 className="mt-4 text-xl font-bold">{title}</h3>
              <p className="mt-3 leading-relaxed">{description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
