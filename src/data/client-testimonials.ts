/** Client quotes for homepage trust block. Copy is plain English, no fabricated metrics. */

export type ClientTestimonial = {
  id: string;
  quote: string;
  name: string;
  role: string;
  organization: string;
  location: string;
  imageSrc: string;
  imageAlt: string;
};

export const CLIENT_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'clinicplus',
    quote:
      'We needed bookings that site clinics and mining teams could use without phone calls for every slot. Ayabonga built it straight, fixed issues when we reported them, and did not vanish after go-live.',
    name: 'Dr. Bertha van der Spuy-Lombaard',
    role: 'MD, Occupational Health Specialist',
    organization: 'ClinicPlus',
    location: 'Witbank',
    imageSrc: '/images/spuy.avif',
    imageAlt: 'Portrait of Dr. Bertha van der Spuy-Lombaard',
  },
  {
    id: 'western-cape-labs',
    quote:
      'Our brief was messy and the timeline was tight. He asked the right questions early, shipped something we could put in front of partners, and stayed reachable when we needed changes.',
    name: 'Mike Jones',
    role: 'Director',
    organization: 'Western Cape Labs',
    location: 'Cape Town',
    imageSrc: '/images/mike_jones.avif',
    imageAlt: 'Portrait of Mike Jones',
  },
  {
    id: 'warner-music-africa',
    quote:
      'He gets both the music business and the technical side. Updates were clear, no hype, and we could ship without rewriting the whole thing six months later.',
    name: 'Temi Adeniji',
    role: 'MD of WM Africa',
    organization: 'Warner Music Africa',
    location: 'Nigeria',
    imageSrc: '/images/temii.jpeg',
    imageAlt: 'Portrait of Temi Adeniji',
  },
];
