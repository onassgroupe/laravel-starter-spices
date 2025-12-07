import { AdminLayout } from '@/apps/admin/features/dashboard/layouts/admin.layout';
import { StatsCard } from '@/apps/admin/features/dashboard/components/stats-card';
import { cn } from '@/lib/utils';
import {
    Activity,
    ArrowUpRight,
    CreditCard,
    DollarSign,
    TrendingUp,
    Users,
} from 'lucide-react';

// Mock data - replace with actual data from backend
const stats = [
    {
        title: 'Revenus totaux',
        value: '45,231 €',
        change: 20.1,
        changeLabel: 'vs mois dernier',
        icon: DollarSign,
    },
    {
        title: 'Abonnements',
        value: '+2,350',
        change: 180.1,
        changeLabel: 'vs mois dernier',
        icon: Users,
    },
    {
        title: 'Ventes',
        value: '+12,234',
        change: 19,
        changeLabel: 'vs mois dernier',
        icon: CreditCard,
    },
    {
        title: 'Utilisateurs actifs',
        value: '+573',
        change: 201,
        changeLabel: 'depuis la semaine dernière',
        icon: Activity,
    },
];

const recentActivity = [
    { user: 'Jean Dupont', action: "S'est inscrit", time: 'Il y a 2 min', type: 'new' },
    { user: 'Marie Martin', action: 'A souscrit au plan Pro', time: 'Il y a 15 min', type: 'upgrade' },
    { user: 'Pierre Durand', action: 'A mis à jour son profil', time: 'Il y a 1h', type: 'update' },
    { user: 'Sophie Bernard', action: "S'est inscrit", time: 'Il y a 2h', type: 'new' },
    { user: 'Lucas Petit', action: 'A souscrit au plan Enterprise', time: 'Il y a 3h', type: 'upgrade' },
];

export default function DashboardPage() {
    return (
        <AdminLayout title="Dashboard">
            <div className="space-y-8">
                {/* Stats Grid */}
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat, index) => (
                        <StatsCard
                            key={index}
                            title={stat.title}
                            value={stat.value}
                            change={stat.change}
                            changeLabel={stat.changeLabel}
                            icon={stat.icon}
                        />
                    ))}
                </div>

                {/* Main content grid */}
                <div className="grid gap-6 lg:grid-cols-7">
                    {/* Chart section */}
                    <div className="lg:col-span-4">
                        <div className="rounded-2xl border border-white/20 dark:border-gray-800/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Aperçu des revenus</h3>
                                    <p className="text-sm text-muted-foreground">Revenus mensuels de l'année</p>
                                </div>
                                <div className="flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-1.5">
                                    <TrendingUp className="h-4 w-4 text-primary" />
                                    <span className="text-sm font-medium text-primary">+12.5%</span>
                                </div>
                            </div>

                            {/* Simple chart mock */}
                            <div className="h-[300px] flex items-end gap-2">
                                {[40, 70, 50, 80, 60, 90, 75, 85, 65, 95, 80, 88].map((height, i) => (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2">
                                        <div
                                            className={cn(
                                                'w-full rounded-t-lg transition-all duration-500',
                                                i === 11 ? 'bg-primary' : 'bg-primary/20 hover:bg-primary/40'
                                            )}
                                            style={{ height: `${height}%` }}
                                        />
                                        <span className="text-xs text-muted-foreground">
                                            {['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc'][i]}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent activity */}
                    <div className="lg:col-span-3">
                        <div className="rounded-2xl border border-white/20 dark:border-gray-800/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 h-full">
                            <div className="flex items-center justify-between mb-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground">Activité récente</h3>
                                    <p className="text-sm text-muted-foreground">Dernières actions des utilisateurs</p>
                                </div>
                                <button className="flex items-center gap-1 text-sm font-medium text-primary hover:underline">
                                    Voir tout
                                    <ArrowUpRight className="h-4 w-4" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-4 rounded-xl bg-white/50 dark:bg-gray-800/50 p-4 transition-colors hover:bg-white/80 dark:hover:bg-gray-800/80"
                                    >
                                        <div
                                            className={cn(
                                                'flex h-10 w-10 items-center justify-center rounded-full',
                                                activity.type === 'new' && 'bg-green-100 dark:bg-green-900/30',
                                                activity.type === 'upgrade' && 'bg-primary/10',
                                                activity.type === 'update' && 'bg-orange-100 dark:bg-orange-900/30'
                                            )}
                                        >
                                            <span
                                                className={cn(
                                                    'text-sm font-bold',
                                                    activity.type === 'new' && 'text-green-600 dark:text-green-400',
                                                    activity.type === 'upgrade' && 'text-primary',
                                                    activity.type === 'update' && 'text-orange-600 dark:text-orange-400'
                                                )}
                                            >
                                                {activity.user
                                                    .split(' ')
                                                    .map((n) => n[0])
                                                    .join('')}
                                            </span>
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-medium text-foreground truncate">{activity.user}</p>
                                            <p className="text-sm text-muted-foreground truncate">{activity.action}</p>
                                        </div>
                                        <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick actions */}
                <div className="grid gap-4 md:grid-cols-3">
                    {[
                        { title: 'Ajouter un utilisateur', description: 'Créer un nouveau compte utilisateur', color: 'primary' },
                        { title: 'Voir les rapports', description: 'Accéder aux analytics détaillées', color: 'orange' },
                        { title: 'Paramètres', description: 'Configurer votre application', color: 'primary' },
                    ].map((action, index) => (
                        <button
                            key={index}
                            className="group rounded-2xl border border-white/20 dark:border-gray-800/30 bg-white/60 dark:bg-gray-900/60 backdrop-blur-xl p-6 text-left transition-all hover:bg-white/80 dark:hover:bg-gray-900/80 hover:shadow-lg"
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                                        {action.title}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">{action.description}</p>
                                </div>
                                <ArrowUpRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </AdminLayout>
    );
}
