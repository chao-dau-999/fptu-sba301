import { useState, useEffect } from 'react';
function Header({ title="a" }) {
    const [currentDate, setCurrentDate] = useState('');
    useEffect(() => {
        const now = new Date();
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();
        setCurrentDate(`${day}/${month}/${year}`);
    }, []);
    return (
        <div style={{ borderBottom: '2px solid #dee2e6', marginBottom: '20px' }}>
            <div className='d-flex justify-content-between align-items-center px-3 pt-2'>
                <div style={{ border: '1px solid #000', padding: '4px 12px', fontWeight:
                        'bold' }}>
                    Logo
                </div>
                <div>Date: {currentDate || 'dd/MM/yyyy'}</div>
            </div>
        </div>
    );
}
export default Header;