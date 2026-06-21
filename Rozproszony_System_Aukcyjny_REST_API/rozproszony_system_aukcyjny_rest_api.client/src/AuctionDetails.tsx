import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from './api';
import type { Auction } from './mockData'; 
import CountdownTimer from './CountdownTimer';

function AuctionDetails() {
  const { id } = useParams<{ id: string }>();
  const [auction, setAuction] = useState<Auction | null>(null);
  const [bidAmount, setBidAmount] = useState<string>('');

  useEffect(() => {
    apiFetch(`http://localhost:61089/api/auctions/${id}`)
      .then(res => res.json())
      .then(data => setAuction(data))
      .catch(err => console.error("Błąd pobierania szczegółów:", err));
  }, [id]);

  if (!auction) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Ładowanie lub nie znaleziono... <Link to="/">Wróć</Link></div>;

  const handleBid = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    const res = await apiFetch(`http://localhost:61089/api/auctions/${id}/bids`, {
      method: 'POST',
      body: JSON.stringify({ amount: parseFloat(bidAmount) })
    });
    
    if (res.ok) {
      alert("Licytacja udana!");
      window.location.reload();
    } else {
      const errorText = await res.text();
      alert("Błąd: " + errorText);
    }
  };

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', marginTop: '20px' }}>
      
      <div style={{ flex: '1 1 400px', borderRadius: '24px', overflow: 'hidden', boxShadow: 'var(--shadow-lg)' }}>
        <img 
          src={auction.imageUrl} 
          alt={auction.title} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', maxHeight: '500px' }} 
        />
      </div>

      <div style={{ 
        flex: '1 1 400px', 
        background: 'var(--card-bg)', 
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span style={{ background: 'rgba(99, 102, 241, 0.1)', color: 'var(--primary-color)', padding: '6px 12px', borderRadius: '8px', fontSize: '13px', fontWeight: '700', textTransform: 'uppercase', alignSelf: 'flex-start', marginBottom: '20px' }}>
          {auction.category}
        </span>
        
        <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: '800' }}>{auction.title}</h2>
        <p style={{ lineHeight: '1.6', marginBottom: '30px' }}>{auction.description}</p>

        <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.03)', padding: '20px', borderRadius: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '25px' }}>
            <div>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--text-muted)' }}>Aktualna cena</p>
              <p style={{ margin: 0, fontSize: '36px', fontWeight: '800' }}>
                {auction.currentPrice.toFixed(2)} <span style={{ fontSize: '18px' }}>PLN</span>
              </p>
            </div>
            <CountdownTimer targetDate={auction.endTime} />
          </div>
          
          <form onSubmit={handleBid} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="number" 
              step="0.01" 
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder="Twoja oferta..."
              required
              style={{ flex: '1', padding: '14px', borderRadius: '12px' }}
            />
            <button type="submit" style={{ background: 'var(--primary-color)', color: 'white', padding: '0 24px', borderRadius: '12px', border: 'none', cursor: 'pointer', fontWeight: '700' }}>
              Licytuj
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AuctionDetails;