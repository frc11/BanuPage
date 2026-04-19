import { Metadata } from 'next'
import NosotrosHero from '@/src/components/nosotros/nosotros-hero'
import NosotrosHistoria from '@/src/components/nosotros/nosotros-historia'
import NosotrosPorQue from '@/src/components/nosotros/nosotros-porque'
import NosotrosServicios from '@/src/components/nosotros/nosotros-servicios'
import NosotrosContacto from '@/src/components/nosotros/nosotros-contacto'
import { SectionDivider } from '@/src/components/ui/section-divider'

export const metadata: Metadata = {
  title: 'Nosotros | Banū Scents',
  description: 'Conocé la historia de Banū Scents, la primera curadora de perfumes árabes de alta gama en Argentina.'
}

export default function NosotrosPage() {
  return (
    <>
      <NosotrosHero />
      <SectionDivider variant="pattern" from="cream" to="dark" />
      <NosotrosHistoria />
      <SectionDivider variant="pattern" from="dark" to="cream" />
      <NosotrosPorQue />
      <SectionDivider variant="pattern" from="cream" to="dark" />
      <NosotrosServicios />
      <SectionDivider variant="pattern" from="dark" to="cream" />
      <NosotrosContacto />
    </>
  )
}
