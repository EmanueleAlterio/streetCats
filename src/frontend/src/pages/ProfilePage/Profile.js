import React, { useEffect, useState, useRef } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import { jwtDecode as jwt_decode } from 'jwt-decode';
import axios from 'axios';
import './Profile.scss';
import ConfirmModal from '../../elements/ConfirmModal/ConfirmModal';

//Import per le icone
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';

function Profile() {
	const [user, setUser] = useState(null);
	const [selectedFile, setSelectedFile] = useState(null);
	const [showLogoutModal, setShowLogoutModal] = useState(false);
	const [showRemovePhotoModal, setShowRemovePhotoModal] = useState(false);
	const [error, setError] = useState(null);
	const fileInputRef = useRef(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const decoded = jwt_decode(token);
			const userId = decoded.id;

			axios.get(`http://localhost:3001/api/users/${userId}`, {
				headers: {Authorization: `Bearer ${token}`},
			})
			.then((res) => setUser(res.data))
			.catch((err) => setError('Errore nel recupero dei dati utente'));
		} catch (err) {
			setError('Token non valido');
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
			const response = await axios.post(
				'http://localhost:3001/api/users/upload-profile-image',
				formData,
				{
					headers: { Authorization: `Bearer ${token}` },
				}
			);

			if (response.data.filePath) {
				setUser((prev) => ({ ...prev, fotoProfilo: response.data.filePath }));
			}
		} catch (err) {
			setError("Errore durante l'upload");
		}
	};


	const handleRemovePhoto = async () => {
		setShowRemovePhotoModal(false);
		const token = localStorage.getItem('token');
		if (!token) return;

		try {
			const response = await axios.delete('http://localhost:3001/api/users/remove-profile-image', { headers: { Authorization: `Bearer ${token}` }});

			if (response.status === 200) {
				setUser((prev) => ({ ...prev, fotoProfilo: null }));
			} else {
				setError('Errore nella rimozione della foto');
			}
		} catch (err) {
			setError('Errore nella rimozione della foto');
		}
	};

	const confirmLogout = () => {
		setShowLogoutModal(false);
		localStorage.removeItem('token');
		navigate('/login');
	}

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
		<div className=" profile-page d-flex justify-content-center align-items-center vh-100">
			<div className="profile-card p-4 bg-light rounded shadow d-flex flex-column justify-content-center align-items-center" 
			style={{ maxWidth: '500px', width: '100%', minWidth: '200px', minHeight:'400px', position:'relative'}}>
				<div className="text-center mb-3">
					<ConfirmModal
						show={showLogoutModal}
						title="Conferma Logout"
						message="Sei sicuro di voler effettuare il logout?"
						onConfirm={confirmLogout}
						onCancel={() => setShowLogoutModal(false)}
					/>

					<button
						onClick={() => setShowLogoutModal(true)}
						className="btn btn-link logout-button "
						title="Logout"
					>
						<FontAwesomeIcon icon={faDoorOpen} />
					</button>

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

					<ConfirmModal
						show={showRemovePhotoModal}
						title={"Rimozione Foto Profilo"}
						message={"Vuoi rimuovere la foto profilo?"}
						onConfirm={handleRemovePhoto}
						onCancel={() => setShowRemovePhotoModal(false)}
					/>
					<button
						onClick={() => setShowRemovePhotoModal(true)}
						className="btn btn-outline-danger btn-md mt-2"
					>
						Rimuovi foto profilo
					</button>

				</div>
			</div>
		</div>
	);
}

export default Profile;
