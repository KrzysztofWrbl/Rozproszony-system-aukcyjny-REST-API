import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { mockAuctions } from './mockData';
import CountdownTimer from './CountdownTimer';

function AuctionDetails() {
  const { id } = useParams<{ id: string }>();
  const auction = mockAuctions.find(a => a.id === parseInt(id || '0'));
  const [bidAmount, setBidAmount] = useState<string>('');

  if (!auction) return <div style={{ textAlign: 'center', marginTop: '50px', fontSize: '20px' }}>Nie znaleziono aukcji. <Link to="/">Wróć</Link></div>;

  const handleBid = (e: React.SyntheticEvent) => {
    e.preventDefault();
    alert(`Wysłano ofertę na kwotę: ${bidAmount} PLN!`);
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
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        border: '1px solid var(--card-border)',
        padding: '40px', 
        borderRadius: '24px', 
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column'
      }}>
        <span style={{ 
          background: 'rgba(99, 102, 241, 0.1)', 
          color: 'var(--primary-color)', 
          padding: '6px 12px', 
          borderRadius: '8px', 
          fontSize: '13px', 
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          alignSelf: 'flex-start',
          marginBottom: '20px'
        }}>
          {auction.category}
        </span>
        
        <h2 style={{ margin: '0 0 10px 0', fontSize: '32px', fontWeight: '800', lineHeight: '1.2' }}>{auction.title}</h2>
        <p style={{ margin: '0 0 20px 0', color: 'var(--text-muted)', fontWeight: '600' }}>Wystawione przez: <span style={{ color: 'var(--primary-color)' }}>{auction.sellerName}</span></p>
        
        <p style={{ lineHeight: '1.6', fontSize: '16px', marginBottom: '30px', color: 'var(--text-color)' }}>
          {auction.description}
        </p>

        <div style={{ marginTop: 'auto', background: 'rgba(0,0,0,0.03)', padding: '20px', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <span style={{ fontWeight: '600', color: 'var(--text-muted)' }}>Czas do końca:</span>
            <span style={{ fontWeight: '800', color: 'var(--primary-color)', fontSize: '18px', background: 'rgba(99, 102, 241, 0.1)', padding: '6px 12px', borderRadius: '10px', display: 'flex', gap: '8px', alignItems: 'center' }}>
              <span>⏳</span>
              <CountdownTimer targetDate={auction.endTime} />
            </span>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
            <div>
              <p style={{ margin: '0 0 5px 0', fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600' }}>Aktualna cena ({auction.bidsCount} ofert)</p>
              <p style={{ margin: 0, fontSize: '36px', fontWeight: '800', color: 'var(--text-color)', lineHeight: '1' }}>
                {auction.currentPrice.toFixed(2)} <span style={{ fontSize: '18px', color: 'var(--text-muted)' }}>PLN</span>
              </p>
            </div>
          </div>
          
          <form onSubmit={handleBid} style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="number" 
              step="0.01" 
              min={auction.currentPrice + 1} 
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              placeholder={`Min. ${(auction.currentPrice + 1).toFixed(2)}`}
              required
              style={{ flex: '1', padding: '14px', borderRadius: '12px', fontSize: '16px', fontWeight: '600' }}
            />
            <button type="submit" style={{ 
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', 
              color: 'white', 
              border: 'none', 
              padding: '0 24px', 
              borderRadius: '12px', 
              cursor: 'pointer', 
              fontWeight: '700',
              fontSize: '16px',
              boxShadow: '0 4px 15px rgba(99, 102, 241, 0.3)',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.background = 'linear-gradient(135deg, #4f46e5 0%, #db2777 100%)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.5)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.background = 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)';
              e.currentTarget.style.boxShadow = '0 4px 15px rgba(99, 102, 241, 0.3)';
            }}
            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.97)'}
            onMouseUp={(e) => e.currentTarget.style.transform = 'translateY(-2px) scale(1)'}
            >
              Licytuj
            </button>
          </form>
        </div>
      </div>

    </div>
  );
}

export default AuctionDetails;