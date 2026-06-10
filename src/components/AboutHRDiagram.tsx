interface AboutSection {
  title: string;
  paragraphs: string[];
}

const SECTIONS: AboutSection[] = [
  {
    title: 'Origin of the HR Diagram',
    paragraphs: [
      'The diagram is named after Danish astronomer Ejnar Hertzsprung and American astronomer Henry Norris Russell, who independently developed it in the early 20th century (around 1911–1913).',
      'At the time, astronomy was moving from simply cataloguing stars toward understanding their physical nature. By plotting stellar brightness against spectral type (a proxy for temperature), they revealed that stars are not scattered randomly but fall into distinct groups.',
      'It was developed to bring order to stellar classification, turning thousands of individual observations into a single, interpretable picture of how stars relate to one another.',
    ],
  },
  {
    title: 'Use of the HR Diagram',
    paragraphs: [
      'Astronomers use the HR diagram to classify stars by plotting luminosity (vertical axis) against surface temperature (horizontal axis, conventionally reversed so hotter stars sit on the left).',
      'The temperature–luminosity relationship sorts stars into clear regions: the diagonal main sequence where stars spend most of their lives fusing hydrogen, the cool but bright giants and supergiants in the upper right, and the hot but faint white dwarfs in the lower left.',
      'A star\u2019s position immediately suggests its size, temperature, and evolutionary stage, making the diagram an everyday tool for interpreting observations.',
    ],
  },
  {
    title: 'Impact of the HR Diagram',
    paragraphs: [
      'The HR diagram is one of the most important tools in astrophysics because it links a star\u2019s observable properties to its underlying physics.',
      'It was central to developing the theory of stellar evolution: tracking how stars move across the diagram over time explained how they are born, age, and die, and underpinned our understanding of stellar lifecycles.',
      'It remains in active use today\u2014both in cutting-edge research (for example, dating star clusters and studying stellar populations) and as a foundational teaching tool in astronomy education.',
    ],
  },
];

export function AboutHRDiagram() {
  return (
    <section className='rounded-[28px] border border-white/10 bg-slate-900/80 p-6 shadow-lg shadow-slate-950/20'>
      <div className='mb-6'>
        <p className='text-xs uppercase tracking-[0.3em] text-slate-500'>
          Reference
        </p>
        <h3 className='mt-2 text-xl font-semibold text-slate-100'>
          About the HR Diagram
        </h3>
        <p className='mt-2 text-sm text-slate-400'>
          The origin, use, and lasting impact of the Hertzsprung–Russell
          diagram.
        </p>
      </div>

      <div className='grid gap-4 md:grid-cols-3'>
        {SECTIONS.map((section) => (
          <article
            key={section.title}
            className='rounded-2xl border border-slate-700 bg-slate-950/75 p-4'
          >
            <h4 className='text-sm font-semibold text-cyan-200'>
              {section.title}
            </h4>
            <div className='mt-3 space-y-2'>
              {section.paragraphs.map((paragraph, index) => (
                <p key={index} className='text-sm leading-relaxed text-slate-400'>
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
