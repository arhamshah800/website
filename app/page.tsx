import { Section } from '@/components/blocks/section'
import { Hero } from '@/features/home/hero'
import { ProofStrip } from '@/features/home/proof-strip'
import { ProjectsGrid } from '@/features/home/projects-grid'
import { ResumeSection } from '@/features/home/resume-section'
import { SkillsSection } from '@/features/home/skills-lattice'
import { getHomeData } from '@/lib/cms-data'
import { Reveal } from '@/components/motion/reveal'
import type { Certification } from '@/lib/data'

export default async function HomePage() {
  const { profile, projects, experiences, skillsByGroup, certifications } = await getHomeData()

  return (
    <>
      <Hero profile={profile} />
      <ProofStrip
        projects={projects}
        experiences={experiences}
        certifications={certifications}
        skillsByGroup={skillsByGroup}
      />

      <ProjectsGrid projects={projects} />

      <ResumeSection experiences={experiences} resumeUrl={profile.resume ?? '/SpringResume.pdf'} />

      <SkillsSection skillsByGroup={skillsByGroup} />

      <Section title="Certifications" subtitle="Supplemental training and applied credentials.">
        <div className="grid gap-3 md:grid-cols-2">
          {certifications.map((cert: Certification, index: number) => (
            <Reveal key={cert.name} delay={index * 0.02}>
              <div className="card-surface rounded-xl p-4 text-sm text-[#94a3b8] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#bf5700]/30">
                <span className="font-medium text-[#f1f5f9]">{cert.name}</span>
                {cert.issuer ? (
                  <span className="ml-2 text-[#64748b]">— {cert.issuer}</span>
                ) : null}
                {cert.date ? (
                  <span className="ml-2 text-[#64748b]">({cert.date})</span>
                ) : null}
              </div>
            </Reveal>
          ))}
        </div>
      </Section>
    </>
  )
}
