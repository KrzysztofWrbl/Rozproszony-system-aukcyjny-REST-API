import { Link } from 'react-router-dom';
import { mockAuctions } from './mockData';
import CountdownTimer from './CountdownTimer';

function AuctionList() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '30px' }}>
        <div>
          <h1 style={{ margin: '0 0 10px 0', fontSize: '36px', fontWeight: '800', letterSpacing: '-1px' }}>Najlepsze aukcje w sieci</h1>
          <p style={{ margin: 0, color: 'var(--text-muted)', fontSize: '16px' }}>Najlepsze oferty na wyciągnięcie ręki.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '24px', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
        {mockAuctions.map(auction => (
          <Link 
            key={auction.id} 
            to={`/auction/${auction.id}`}
            style={{ textDecoration: 'none', color: 'inherit', display: 'flex' }}
          >
            <div 
              style={{ 
                background: 'var(--card-bg)', 
                backdropFilter: 'var(--glass-blur)',
                WebkitBackdropFilter: 'var(--glass-blur)',
                border: '1px solid var(--card-border)', 
                borderRadius: '20px', 
                boxShadow: 'var(--shadow-sm)',
                transition: 'all 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                cursor: 'pointer',
                overflow: 'hidden'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
              }}
            >
              <div style={{ height: '220px', width: '100%', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={auction.imageUrl} 
                  alt={auction.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
                <div style={{ 
                  position: 'absolute', 
                  bottom: '12px', 
                  right: '12px', 
                  background: 'rgba(15, 23, 42, 0.75)', 
                  backdropFilter: 'blur(8px)', 
                  WebkitBackdropFilter: 'blur(8px)',
                  color: '#fff', 
                  padding: '6px 12px', 
                  borderRadius: '12px', 
                  fontSize: '12px', 
                  fontWeight: '700', 
                  border: '1px solid rgba(255,255,255,0.1)', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px' 
                }}>
                   <span style={{ fontSize: '14px' }}>⏳</span> 
                   <CountdownTimer targetDate={auction.endTime} />
                </div>
              </div>

              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                  <span style={{ 
                    background: 'rgba(99, 102, 241, 0.1)', 
                    color: 'var(--primary-color)', 
                    padding: '4px 10px', 
                    borderRadius: '8px', 
                    fontSize: '12px', 
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {auction.category}
                  </span>
                  <span style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>
                    Ofert: {auction.bidsCount}
                  </span>
                </div>
                
                <h3 style={{ margin: '0 0 15px 0', fontSize: '20px', fontWeight: '700', lineHeight: '1.3' }}>
                  {auction.title}
                </h3>
                
                <div style={{ marginTop: 'auto', paddingTop: '20px', borderTop: '1px solid var(--border-color)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <p style={{ margin: 0, fontSize: '12px', color: 'var(--text-muted)', fontWeight: '600' }}>Aktualna cena</p>
                    <p style={{ margin: 0, fontSize: '24px', fontWeight: '800', color: 'var(--text-color)' }}>
                      {auction.currentPrice.toFixed(2)} <span style={{ fontSize: '14px', color: 'var(--text-muted)' }}>PLN</span>
                    </p>
                  </div>
                  
                  <button style={{ 
                    background: 'var(--primary-color)', 
                    color: 'white', 
                    border: 'none', 
                    padding: '10px 16px', 
                    borderRadius: '10px', 
                    cursor: 'pointer', 
                    fontWeight: '600',
                    transition: 'background 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--primary-hover)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'var(--primary-color)'}
                  >
                    Zobacz
                  </button>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default AuctionList;