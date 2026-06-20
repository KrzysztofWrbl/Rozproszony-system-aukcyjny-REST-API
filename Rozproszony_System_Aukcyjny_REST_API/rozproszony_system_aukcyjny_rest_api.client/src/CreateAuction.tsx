import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from './api';

function CreateAuction() {
  const navigate = useNavigate();
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

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert("Musisz być zalogowana, aby dodać aukcję! Przejdź do zakładki Konto i zaloguj się.");
      return;
    }

    const endDate = new Date();
    endDate.setDate(endDate.getDate() + parseInt(formData.durationInDays));

    const auctionData = {
      title: formData.title,
      description: formData.description,
      category: formData.category,
      startingPrice: parseFloat(formData.startingPrice),
      endTime: endDate.toISOString()
    };

    try {
      const response = await apiFetch('http://localhost:5044/api/auctions', {
      method: 'POST',
      body: JSON.stringify(auctionData)
    });

      if (response.ok) {
        alert("Aukcja została wystawiona!");
        navigate('/');
      } else {
        const errorText = await response.text();
        alert("Błąd API: " + errorText);
      }
    } catch (err) {
      alert("Nie można połączyć się z serwerem.");
    }
  };

  return (
    <div style={{ maxWidth: '550px', margin: '40px auto', padding: '40px', background: 'var(--card-bg)', backdropFilter: 'var(--glass-blur)', WebkitBackdropFilter: 'var(--glass-blur)', border: '1px solid var(--card-border)', borderRadius: '24px', boxShadow: 'var(--shadow-lg)', transition: 'all 0.4s ease' }}>
      <h2 style={{ marginTop: 0, textAlign: 'center', fontSize: '32px', fontWeight: '800', letterSpacing: '-0.5px' }}>Wystaw nową aukcję</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
        
        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Tytuł produktu
          <input type="text" name="title" value={formData.title} onChange={handleChange} required style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} />
        </label>

        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Opis produktu
          <textarea name="description" value={formData.description} onChange={handleChange} required style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px', minHeight: '100px' }} />
        </label>

        <div style={{ display: 'flex', gap: '20px' }}>
          <label style={{ flex: '1', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Kategoria
            <input type="text" name="category" value={formData.category} onChange={handleChange} required style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} />
          </label>
          <label style={{ flex: '1', fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
            Cena wywoławcza (PLN)
            <input type="number" step="0.01" name="startingPrice" value={formData.startingPrice} onChange={handleChange} required style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} />
          </label>
        </div>

        <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Czas trwania (dni)
          <input type="number" name="durationInDays" value={formData.durationInDays} onChange={handleChange} min="1" required style={{ width: '100%', padding: '14px', marginTop: '8px', borderRadius: '12px', fontSize: '15px' }} />
        </label>

        <button type="submit" style={{ padding: '16px', background: 'var(--primary-color)', color: 'white', border: 'none', borderRadius: '12px', cursor: 'pointer', fontWeight: '700' }}>
          Uruchom aukcję
        </button>
      </form>
    </div>
  );
}

export default CreateAuction;