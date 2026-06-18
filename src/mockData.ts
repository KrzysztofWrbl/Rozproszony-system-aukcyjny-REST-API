export interface Auction {
  id: number;
  title: string;
  currentPrice: number;
  endTime: string;
  sellerName: string;
  bidsCount: number;
  description: string;
  category: string;
  imageUrl: string;
}

const futureDate = new Date();
futureDate.setMonth(futureDate.getMonth() + 3);
const dynamicEndTime = futureDate.toISOString();

export const mockAuctions: Auction[] = [
  {
    id: 1,
    title: "Komputer Stacjonarny",
    currentPrice: 1950.00,
    endTime: dynamicEndTime,
    sellerName: "Pecetowiec",
    bidsCount: 3,
    description: "Używany komputer dla graczy. Karta graficzna z serii RTX, wydajny procesor, ciche chłodzenie. Stan bardzo dobry, regularnie czyszczony z kurzu.",
    category: "PC",
    imageUrl: "https://images.unsplash.com/photo-1587202372634-32705e3bf49c?auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Klawiatura Mechaniczna",
    currentPrice: 250.00,
    endTime: dynamicEndTime,
    sellerName: "Klawiszowiec",
    bidsCount: 1,
    description: "Świetna klawiatura z niebieskimi przełącznikami (blue switches) o wyczuwalnym kliku. Pełne podświetlenie RGB z wieloma trybami. Kabel w oplocie.",
    category: "Akcesoria",
    imageUrl: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=800&q=80"
  }
];