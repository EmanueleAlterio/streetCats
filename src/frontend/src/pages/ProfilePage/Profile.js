import React, { useEffect, useState } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import './Profile.scss';

function Profile() {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
		const decoded = jwt_decode(token);
		const userId = decoded.id;

		fetch(`http://localhost:3001/api/users/${userId}`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		})
			.then((res) => res.json())
			.then((data) => setUser(data))
			.catch((err) => console.error('Errore nel recupero dati utente:', err));
			
		} catch (err) {
			console.error('Token non valido:', err);
		}
	}, []);

	if (!user) {
		return <div className="container mt-5">Caricamento profilo...</div>;
	}

	const profileImage = user.foto_profilo
		? `http://localhost:3001/${user.foto_profilo}`
		: '/default-profile.png';

	return (
		<div className="container mt-5">
		<h2 className="mb-4">Profilo Utente</h2>
		<div className="profile-card d-flex align-items-center p-4 bg-light rounded shadow-sm">
			<img
			src={profileImage}
			alt="Foto profilo"
			className="rounded-circle me-4"
			style={{ width: '100px', height: '100px', objectFit: 'cover' }}
			/>
			<div>
			<h4 className="mb-1">{user.username}</h4>
			<p className="mb-0 text-muted">Email: {user.email}</p>
			</div>
		</div>
		</div>
	);
}

export default Profile;
