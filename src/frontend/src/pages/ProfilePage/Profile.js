import React, { useEffect, useState, useRef  } from 'react';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import './Profile.scss';

function Profile() {
	const [user, setUser] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const fileInputRef = useRef(null);

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

	const handleFileChange = (e) => {
		handleRemovePhoto();
		const file = e.target.files[0];
		if (file) {
			setSelectedFile(file);
			handleUpload(file);
		}
		e.target.value = null;
	};

	const handleUpload = async (file) => {
		const token = localStorage.getItem('token');
		if (!file || !token) return;

		const formData = new FormData();
		formData.append('fotoProfilo', file);

		try {
			const response = await fetch('http://localhost:3001/api/users/upload-profile-image', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${token}`,
				},
				body: formData,
			});

			const result = await response.json();
			if (result.filePath) {
				setUser((prev) => ({ ...prev, fotoProfilo: result.filePath }));
			}
		} catch (err) {
			console.error("Errore durante l'upload:", err);
		}
	};

	const handleRemovePhoto = async () => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const response = await fetch('http://localhost:3001/api/users/remove-profile-image', {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			if (response.ok) {
				setUser((prev) => ({ ...prev, fotoProfilo: null }));
			} else {
				console.error('Errore nella rimozione della foto');
			}
		} catch (err) {
			console.error('Errore nella richiesta:', err);
		}
	};

	const handleButtonClick = () => {
		fileInputRef.current.click(); // Simula il click sull'input nascosto
	};

	if (!user) {
		return <div className="container mt-5">Caricamento profilo...</div>;
	}

	console.log(user.fotoProfilo);

	const profileImage = user.fotoProfilo
		? `http://localhost:3001/${user.fotoProfilo}`
		: '/default-profile.png';

	return (
		<div className="d-flex justify-content-center align-items-center vh-100">
			<div className="profile-card p-4 bg-light rounded shadow d-flex flex-column justify-content-center align-items-center" 
			style={{ maxWidth: '500px', width: '100%', minWidth: '200px', minHeight:'400px'}}>
				<div className="text-center mb-3">
					<div
						className="profile-image-wrapper position-center mb-3 mx-auto"
						onClick={handleButtonClick}
						style={{ width: '120px', height: '120px', cursor: 'pointer' }}
					>
						<img
							src={profileImage}
							alt="Foto profilo"
							className="profile-image rounded-circle"
							style={{ width: '100%', height: '100%', objectFit: 'cover' }}
						/>
						<div className="overlay-plus d-flex justify-content-center align-items-center">
							<span className="plus-icon">+</span>
						</div>
					</div>

					<h4>{user.username}</h4>
					<div className="text-center mb-3">
						<input
							type="file"
							accept="image/*"
							ref={fileInputRef}
							style={{ display: 'none' }}
							onChange={handleFileChange}
						/>
					</div>
					<p className="text-muted mb-3">Email: {user.email}</p>
					<p className="text-muted mb-3">
						Sei su Street Cats da:{" "}
						{new Date(user.dataRegistrazione).toLocaleDateString("it-IT", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						})}
					</p>
					<button
						onClick={handleRemovePhoto}
						className="btn btn-outline-danger btn-sm mt-2"
					>
						Rimuovi foto profilo
					</button>

				</div>
			</div>
		</div>
	);
}

export default Profile;
