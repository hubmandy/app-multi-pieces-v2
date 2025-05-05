
import { useState } from "react";

const pieces = [
  { id: "cuisine", nom: "Cuisine", couleur: "#FFD700" },
  { id: "salon", nom: "Salon / Salle à manger", couleur: "#ADD8E6" },
  { id: "sallebains", nom: "Salle de bains", couleur: "#FFB6C1" },
  { id: "chambre", nom: "Chambres", couleur: "#D8BFD8" },
  { id: "wc", nom: "Toilettes", couleur: "#B0E0E6" },
  { id: "jardin", nom: "Jardin", couleur: "#90EE90" },
  { id: "atelier", nom: "Atelier bois", couleur: "#DEB887" },
  { id: "mezzanine", nom: "Mezzanine (Bureau)" , couleur: "#FFA07A" },
  { id: "cellier", nom: "Cellier / Buanderie", couleur: "#BDB76B" }
];

const tachesParPiece = {
  cuisine: ["Vaisselle", "Frigo", "Plaque cuisson", "Serpillère", "Faire le repas"],
  salon: ["Écran télé", "Table basse", "Balayer"],
  sallebains: ["Lavabo", "Douche", "Sol"],
  chambre: ["Faire le lit", "Balayer", "Ranger vêtements"],
  wc: ["Cuve", "Sol", "Papier toilette"],
  jardin: ["Tondre", "Ramasser feuilles", "Nettoyer gamelles"],
  atelier: ["Rangement outils", "Aspiration sciure"],
  mezzanine: ["Rangement bureau", "Nettoyer écran", "Aspirer sol"],
  cellier: ["Lancer une machine", "Étendre le linge", "Plier / ranger"]
};

export default function App() {
  const [utilisateur, setUtilisateur] = useState("");
  const [pieceActive, setPieceActive] = useState(null);
  const [historique, setHistorique] = useState([]);

  const validerTache = (tache) => {
    const now = new Date();
    setHistorique([...historique, {
      utilisateur,
      piece: pieceActive.nom,
      tache,
      date: now.toLocaleString()
    }]);
  };

  if (!utilisateur) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">Bienvenue !</h2>
        <input
          placeholder="Votre prénom"
          value={utilisateur}
          onChange={(e) => setUtilisateur(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
    );
  }

  if (!pieceActive) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4">Bonjour {utilisateur} 👋</h2>
        <p className="mb-2">Choisis une pièce :</p>
        <div className="grid grid-cols-2 gap-4">
          {pieces.map(p => (
            <button
              key={p.id}
              onClick={() => setPieceActive(p)}
              style={{ backgroundColor: p.couleur }}
              className="p-4 rounded shadow text-sm font-semibold"
            >
              {p.nom}
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <button onClick={() => setPieceActive(null)} className="mb-4 underline">⬅ Retour</button>
      <h2 className="text-lg font-bold mb-2" style={{ color: pieceActive.couleur }}>{pieceActive.nom}</h2>
      <p className="mb-2">Que veux-tu marquer comme fait ?</p>
      <ul className="space-y-2">
        {tachesParPiece[pieceActive.id].map((t, i) => (
          <li key={i} className="flex justify-between items-center border p-2 rounded">
            <span>{t}</span>
            <button onClick={() => validerTache(t)} className="text-green-600 font-semibold">✓ Fait</button>
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <h3 className="font-semibold mb-2">Historique récent</h3>
        <ul className="text-sm space-y-1">
          {historique.slice(-5).reverse().map((h, i) => (
            <li key={i}>✅ {h.utilisateur} a fait "{h.tache}" dans {h.piece} à {h.date}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
