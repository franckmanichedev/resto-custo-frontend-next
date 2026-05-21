import React, { type ReactElement } from 'react'
import { useNavigate } from 'react-router-dom'
import { Utensils, Building2, Users, ArrowRight } from 'lucide-react'
import { AuthLayout } from '@/components/auth/AuthLayout'
import { AuthCard } from '@/components/auth/AuthCard'

const choices = [
    {
        id: 'independent',
        title: 'Restaurant indépendant',
        description: 'Gérez votre propre établissement en toute autonomie.',
        icon: Utensils,
        path: '/auth/register-independent'
    },
    {
        id: 'franchise',
        title: 'Franchise / Chaîne',
        description: 'Centralisez la gestion de vos multiples succursales.',
        icon: Building2,
        path: '/auth/register-franchise'
    },
    {
        id: 'team',
        title: 'Rejoindre une équipe',
        description: 'Accédez à un espace de travail existant via une invitation.',
        icon: Users,
        path: '/auth/register-join'
    }
]

export function RegisterChoicePage(): ReactElement {
    const navigate = useNavigate()

    return (
        <AuthLayout showHero>
            <AuthCard
                title="Créer votre compte"
                subtitle="Sélectionnez le type de structure qui correspond à votre activité pour configurer votre espace Resto QR Code."
                className="w-full max-w-3xl" // Légèrement élargi pour donner de l'air au texte
            >
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mt-2">
                    {choices.map((choice) => {
                        const Icon = choice.icon
                        return (
                            <button
                                key={choice.id}
                                onClick={() => navigate(choice.path)}
                                className="
                                    group relative flex flex-row items-center gap-4 rounded-xl border border-border/60 bg-card p-5 
                                    text-left shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:bg-muted/30 
                                    hover:shadow-md md:flex-col md:items-start md:gap-0 md:p-6 cursor-pointer focus-visible:outline-2 
                                    focus-visible:outline-offset-2 focus-visible:outline-primary
                                "
                            >
                                {/* Conteneur Icône Premium */}
                                <div className="
                                    flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-secondary/50 text-muted-foreground 
                                    ring-1 ring-border/50 transition-all duration-300 group-hover:scale-105 group-hover:bg-primary/10 
                                    group-hover:text-primary group-hover:ring-primary/20 md:mb-5
                                ">
                                    <Icon size={22} strokeWidth={1.75} className="transition-colors duration-200 group-hover:text-primary" />
                                </div>

                                {/* Textes */}
                                <div className="flex-1 plant-y-1">
                                    <h3 className="font-medium text-foreground tracking-tight transition-colors duration-200 group-hover:text-primary">
                                        {choice.title}
                                    </h3>
                                    <p className="text-xs leading-relaxed text-muted-foreground/90 mt-1 md:text-sm">
                                        {choice.description}
                                    </p>
                                </div>

                                {/* Flèche de micro-interaction (visible sur MD+ au survol) */}
                                <div className="hidden absolute bottom-5 right-5 text-primary opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 md:block">
                                    <ArrowRight size={16} strokeWidth={2.25} />
                                </div>
                            </button>
                        )
                    })}
                </div>

                {/* Pied de carte épuré */}
                <div className="mt-8 border-t border-border/40 pt-6 text-center">
                    <p className="text-sm text-muted-foreground">
                        Vous avez déjà un compte ?{' '}
                        <button
                            onClick={() => navigate('/auth/login')}
                            className="font-medium text-primary underline-offset-4 hover:underline transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded px-1"
                        >
                            Connectez-vous
                        </button>
                    </p>
                </div>
            </AuthCard>
        </AuthLayout>
    )
}
