import { useState } from 'react';

function CreateAuction() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startingPrice: '',
    durationInDays: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Wysyłanie do API (JSON):", formData);
    alert("Symulacja wysłania formularza do API! Sprawdź konsolę (F12).");
  };

  return (
    <div style={{ 
      maxWidth: '550px', 
      margin: '40px auto', 
      padding: '40px', 
      background: 'var(--card-bg)', 
      backdropFilter: 'var(--glass-blur)',
      WebkitBackdropFilter: 'var(--glass-blur)',
      border: '1px solid var(--card-border)',
      borderRadius: '24px', 
      boxShadow: 'var(--shadow-lg)',
      transition: 'all 0.4s ease'
    }}>
      <h2 style={{ marginTop: 0, textAlign: 'center', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>Wystaw nową aukcję</h2>
      <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '35px', fontSize: '15px' }}>Uzupełnij poniższe dane, aby dodać swój produkt do systemu.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Tytuł produktu
          <input 
            type="text" 
            name="title" 
            value={formData.title} 
            onChange={handleChange} 
            placeholder="np. Szybki Dysk SSD 1TB"
            required 
            style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
          />
        </label>

        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Opis produktu
          <textarea 
            name="description" 
            value={formData.description} 
            onChange={handleChange} 
            placeholder="Opisz najważniejsze cechy przedmiotu..."
            required 
            style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px', minHeight: '100px', resize: 'vertical', fontFamily: 'inherit' }} 
          />
        </label>

        <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
          <label style={{ flex: '1 1 200px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Kategoria
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleChange} 
              placeholder="np. Podzespoły"
              required 
              style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
            />
          </label>

          <label style={{ flex: '1 1 200px', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Cena wywoławcza (PLN)
            <input 
              type="number" 
              step="0.01" 
              name="startingPrice" 
              value={formData.startingPrice} 
              onChange={handleChange} 
              placeholder="0.00"
              required 
              style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
            />
          </label>
        </div>

        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Czas trwania aukcji (w dniach)
          <input 
            type="number" 
            name="durationInDays" 
            value={formData.durationInDays} 
            onChange={handleChange} 
            placeholder="np. 7"
            min="1"
            required 
            style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} 
          />
        </label>

        <button 
          type="submit" 
          style={{ 
            padding: '16px', 
            marginTop: '15px', 
            background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--accent-color) 100%)', 
            color: 'white', 
            border: 'none', 
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
          Uruchom aukcję
        </button>
      </form>
    </div>
  );
}

export default CreateAuction;