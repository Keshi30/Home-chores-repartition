const APP_KEY = "taches-maison-enfants-v1";

const defaultData = {
  people: [
    { name: "Léo", role: "Enfant", avatar: "🦁", color: "#f59e0b", points: 0 },
    { name: "Mia", role: "Enfant", avatar: "🌸", color: "#ec4899", points: 0 },
    { name: "Noah", role: "Enfant", avatar: "🚀", color: "#3b82f6", points: 0 },
    { name: "Parent", role: "Parent", avatar: "🏠", color: "#10b981", points: 0 },
    { name: "Aide", role: "Autre", avatar: "⭐", color: "#8b5cf6", points: 0 }
  ],
  rewards: [
    { title: "Choisir le dessert", points: 10 },
    { title: "Choisir le film", points: 20 },
    { title: "Petite surprise", points: 30 }
  ],
  tasks: [
    {
      id: "litiere-chat",
      name: "Litière du chat",
      type: "daily",
      points: 2,
      icon: "🐱",
      instructions: [
        "Mettre des gants si besoin.",
        "Retirer les morceaux sales.",
        "Jeter dans un sac fermé.",
        "Ajouter un peu de litière propre."
      ]
    },
    {
      id: "caca-chien",
      name: "Caca du chien dehors",
      type: "daily",
      points: 2,
      icon: "🐶",
      instructions: [
        "Prendre un sac.",
        "Ramasser les besoins.",
        "Jeter au bon endroit."
      ]
    },
    {
      id: "ramasser-planchers",
      name: "Ramasser les planchers",
      type: "daily",
      points: 1,
      icon: "🧸",
      instructions: [
        "Faire le tour des pièces.",
        "Ramasser les objets au sol.",
        "Remettre chaque chose à sa place."
      ]
    },
    {
      id: "vider-lave-vaisselle",
      name: "Vider le lave-vaisselle",
      type: "daily",
      points: 2,
      icon: "🍽️",
      instructions: [
        "Ouvrir prudemment.",
        "Sortir la vaisselle.",
        "Ranger chaque chose à sa place."
      ]
    },
    {
      id: "plier-linge",
      name: "Plier le linge",
      type: "daily",
      points: 2,
      icon: "👕",
      instructions: [
        "Séparer le linge.",
        "Plier chaque morceau.",
        "Faire une pile par personne."
      ]
    },
    {
      id: "faire-lavage",
      name: "Faire le lavage",
      type: "daily",
      points: 3,
      icon: "🧺",
      instructions: [
        "Séparer les vêtements.",
        "Ajouter le savon.",
        "Choisir le cycle.",
        "Démarrer la machine."
      ]
    },
    {
      id: "accrocher-linge",
      name: "Accrocher le linge sur la corde",
      type: "daily",
      points: 2,
      icon: "🪢",
      instructions: [
        "Apporter le panier.",
        "Secouer les morceaux.",
        "Fixer avec des épingles."
      ]
    },
    {
      id: "balayeuse-marches",
      name: "Passer la balayeuse dans les marches",
      type: "daily",
      points: 2,
      icon: "🧹",
      instructions: [
        "Dégager les marches.",
        "Commencer par le haut.",
        "Finir les coins."
      ]
    },
    {
      id: "balayeuse-bas",
      name: "Passer la balayeuse en bas",
      type: "daily",
      points: 2,
      icon: "🧹",
      instructions: [
        "Ramasser les objets.",
        "Faire des lignes régulières.",
        "Passer les coins."
      ]
    },
    {
      id: "ramasser-bas",
      name: "Ramasser le plancher en bas",
      type: "daily",
      points: 1,
      icon: "🧺",
      instructions: [
        "Faire le tour.",
        "Remettre les objets.",
        "Laisser le sol dégagé."
      ]
    },
    {
      id: "epousseter",
      name: "Épousseter",
      type: "weekly",
      points: 3,
      icon: "🪶",
      instructions: [
        "Prendre un chiffon.",
        "Commencer par le haut.",
        "Finir en bas."
      ]
    },
    {
      id: "sdb",
      name: "Nettoyer la salle de bain",
      type: "weekly",
      points: 5,
      icon: "🛁",
      instructions: [
        "Ranger les objets.",
        "Nettoyer lavabo et toilette.",
        "Finir par le miroir et le plancher."
      ]
    },
    {
      id: "miroirs",
      name: "Laver les miroirs",
      type: "weekly",
      points: 2,
      icon: "🪞",
      instructions: [
        "Mettre un peu de produit.",
        "Essuyer régulièrement.",
        "Vérifier les traces."
      ]
    },
    {
      id: "frigo",
      name: "Nettoyer le frigo",
      type: "weekly",
      points: 4,
      icon: "🧊",
      instructions: [
        "Sortir les aliments.",
        "Essuyer les tablettes.",
        "Ranger de nouveau."
      ]
    },
    {
      id: "poignees",
      name: "Laver les poignées de porte",
      type: "weekly",
      points: 1,
      icon: "🚪",
      instructions: [
        "Prendre un chiffon.",
        "Essuyer les poignées.",
        "Laisser sécher."
      ]
    },
    {
      id: "draps",
      name: "Changer les draps",
      type: "weekly",
      points: 3,
      icon: "🛏️",
      instructions: [
        "Enlever les draps sales.",
        "Mettre les draps propres.",
        "Finir avec les oreillers."
      ]
    },
    {
      id: "plancher-bas",
      name: "Laver le plancher du bas",
      type: "weekly",
      points: 4,
      icon: "🪣",
      instructions: [
        "Passer la balayeuse.",
        "Préparer l’eau.",
        "Laver par sections."
      ]
    },
    {
      id: "jouets",
      name: "Trier les jouets ou objets qui traînent",
      type: "weekly",
      points: 2,
      icon: "🧸",
      instructions: [
        "Faire des piles.",
        "Remettre les objets.",
        "Vider le surplus."
      ]
    }
  ],
  selectedTasks: [],
  assignments: [],
  completedKeys: [],
  lastDraw: "—"
};
