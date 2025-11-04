import Image from 'next/image'

type Skill = {
	name: string
	icon?: string
	level?: 'Beginner' | 'Intermediate' | 'Advanced'
}

export function SkillCard({ skill }: { skill: Skill }) {
	return (
		<div className="rounded-lg border border-border p-4 shadow-[var(--shadow-card)] bg-bg">
			<div className="flex items-center gap-3">
				{skill.icon ? (
					<div className="relative h-6 w-6">
						<Image
							src={skill.icon}
							alt=""
							fill
							sizes="24px"
							className="object-contain"
						/>
					</div>
				) : null}
				<div>
					<p className="font-medium">{skill.name}</p>
					{skill.level ? <p className="text-xs text-muted">{skill.level}</p> : null}
				</div>
			</div>
		</div>
	)
}


