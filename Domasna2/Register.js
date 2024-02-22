import React, { useState, useEffect } from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ImageBackground,
	Picker,
	Modal,
} from 'react-native';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, storage, db } from './firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, collection } from 'firebase/firestore';
import Add3 from './image/Testot.png';
import Add5 from './image/Sina.png';
import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';
import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import mainLogger from './context/SingletonLogger';

function Register({ navigation }) {
	const [displayName, setDisplayName] = useState('');
	const [displaySurrName, setDisplaySurrName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [gender, setGender] = useState('Male');
	const [file, setFile] = useState(null);
	const [err, setErr] = useState(false);
	const [showPicker, setShowPicker] = useState(false);
	const pickImage = async () => {
		try {
			let result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 3],
				quality: 1,
			});

			mainLogger.log(result);

			if (!result.canceled) {
				const response = await fetch(result.assets[0].uri);

				if (!response.ok) {
					throw new Error('Failed to fetch image');
				}

				const blob = await response.blob();
				mainLogger.log("fetchna");
				setFile(blob);
			}
		} catch (error) {
			console.error('Error picking image:', error);
		}
	};

	function UserConstruct() {
		this.construct = function (builder) {
			builder.addAuth();
			builder.addEmail();
			builder.addPassword();
			return builder.get();
		}
	}

	function UserBuilder() {
		this.user = {auth: undefined, email: "", password: ""};

		this.addAuth = function () {
			this.user.auth = auth;
		}

		this.addEmail = function () {
			this.user.email = email;
		}

		this.addPassword = function () {
			this.user.password = password;
		}

		this.get = function () {
			return this.user;
		}
	}

	const handlesubmit = async () => {
		try {
			let userConstruct = new UserConstruct();
			let userBuilder = new UserBuilder();
			let myNewUser = userConstruct.construct(userBuilder);

			const res = await createUserWithEmailAndPassword(myNewUser.auth, myNewUser.email, myNewUser.password);

			const storageRef = ref(storage, displayName);

			if (file) {
				const uploadTask = uploadBytesResumable(storageRef, file);
				uploadTask.on(
					'state_changed',
					(snapshot) => {},
					(error) => {
						console.error('Error uploading file:', error);
						setErr(true);
					},
					async () => {
						try {
							const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
							const defaultPhotoURL = downloadURL;
							const profileData = {
								displayName,
								photoURL: defaultPhotoURL,
							};

							await updateProfile(res.user, profileData);
							await setDoc(doc(db, 'users', res.user.uid), {
								uid: res.user.uid,
								displayName,
								displaySurrName,
								email,
								photoURL: profileData.photoURL,
							});

							await setDoc(doc(db, 'userChats', res.user.uid), {});
							// Adjust this navigation based on your React Navigation setup
							mainLogger.log('User profile and data updated successfully.');
							setErr(false);
						} catch (uploadError) {
							console.error(
								'Error during download URL or Firestore update:',
								uploadError
							);
							setErr(true);
						}
					}
				);
			} else {
				const profileData = {
					displayName,
				};
				const defaultPhotoURL =
					gender == 'Male'
						? 'https://firebasestorage.googleapis.com/v0/b/labmis-1c6c2.appspot.com/o/pp_1%404x.png?alt=media&token=dbd4a251-4fd2-4e85-93bf-a0af91fb06a6'
						: 'https://firebasestorage.googleapis.com/v0/b/labmis-1c6c2.appspot.com/o/pp_2%404x.png?alt=media&token=db283f8e-5356-472f-8370-414617104897';
				profileData.photoURL = defaultPhotoURL;
				console.log("Profile Data: ", profileData);
				await updateProfile(res.user, profileData);
				await new Promise((resolve) => setTimeout(resolve, 1000));
				const updatedUser = auth.currentUser;
				await setDoc(doc(db, 'users', res.user.uid), {
					uid: res.user.uid,
					displayName,
					displaySurrName,
					email,
					photoURL: updatedUser.photoURL || profileData.photoURL,
				});

				await setDoc(doc(db, 'userChats', res.user.uid), {});
				// navigation.navigate('Home'); // Adjust this navigation based on your React Navigation setup
				mainLogger.log('User profile and data updated successfully.');
				setErr(false);
			}
			setFile(null);
		} catch (authError) {
			console.error('Error creating user:', authError);
			setErr(true);
		}
		navigation.navigate('HomePage');
	};
	const handleSelect = (value) => {
		setGender(value);
		setShowPicker(false);
	};
	return (
		<ImageBackground
			source={require('./image/background.png')}
			style={{ flex: 1, resizeMode: 'cover', width: '100%', height: '100%' }}
		>
			<ScrollView contentContainerStyle={styles.container}>
				<View style={styles.formWrapper} showsVerticalScrollIndicator={false}>
					<View style={styles.logoInputWrapper}>
						<Image
							style={styles.logoicon}
							source={require('./image/logo.png')}
						/>
					</View>
					<View style={styles.pomosen}>
						<View style={styles.fileInputWrapper}>
							<TouchableOpacity onPress={pickImage}>
								<Image
									style={styles.fileInputIcon}
									source={require('./image/photo_icon.png')}
								/>
							</TouchableOpacity>
						</View>

						<View style={styles.pomosen1}>
							<TextInput
								style={styles.input1}
								placeholder="Name"
								placeholderTextColor="#d6d6d6"
								value={displayName}
								onChangeText={(text) => setDisplayName(text)}
							/>
							<TextInput
								style={styles.input1}
								placeholder="Surname"
								placeholderTextColor="#d6d6d6"
								value={displaySurrName}
								onChangeText={(text) => setDisplaySurrName(text)}
							/>
						</View>
					</View>
					<TextInput
						style={styles.input}
						placeholder="email"
						placeholderTextColor="#d6d6d6"
						value={email}
						onChangeText={(text) => setEmail(text)}
					/>
					<TextInput
						style={styles.input}
						placeholder="password"
						placeholderTextColor="#d6d6d6"
						secureTextEntry
						value={password}
						onChangeText={(text) => setPassword(text)}
					/>
					<TouchableOpacity
						style={[styles.input, styles.selectField]}
						onPress={() => setShowPicker(true)}
					>
						<Text style={{ color: '#ffff' }}>
							{gender ? gender : 'Select Gender'}
						</Text>
					</TouchableOpacity>
					<Modal
						visible={showPicker}
						animationType="slide"
						transparent={true}
						onRequestClose={() => setShowPicker(false)}
					>
						<View style={styles.modal}>
							<View style={styles.pickerContainer}>
								<TouchableOpacity onPress={() => handleSelect('Male')}>
									<Text>Male</Text>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => handleSelect('Female')}>
									<Text>Female</Text>
								</TouchableOpacity>
							</View>
						</View>
					</Modal>

					<TouchableOpacity style={styles.button} onPress={handlesubmit}>
						<Text style={styles.buttonText}>Save</Text>
					</TouchableOpacity>
					{err && <Text style={styles.errorText}>Something went wrong</Text>}
					<View style={styles.linii}>
						<View style={styles.line}></View>
						<Text style={styles.orText}> or </Text>
						<View style={styles.line}></View>
					</View>
					<TouchableOpacity
						style={styles.loginLink}
						onPress={() => navigation.navigate('Login')}
					>
						<Text style={styles.buttonText}>Login</Text>
					</TouchableOpacity>
				</View>
			</ScrollView>
		</ImageBackground>
	);
}

const styles = {
	formWrapper: {
		width: wp(100),
		padding: 20,
		gap: 10,
		borderRadius: 10,
		alignItems: 'center',
	},
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	selectField: {
		justifyContent: 'center',
	},
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	pickerContainer: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	pomosen: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		width: '100%',
	},
	pomosen1: {
		flexDirection: 'column',
		width: '75%',
	},
	linii: {
		flexDirection: 'row',
		alignItems: 'center',
		marginVertical: 10,
	},
	line: {
		flex: 1,
		height: 1,
		backgroundColor: 'black',
	},
	orText: {
		paddingHorizontal: 10,
	},
	logo: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#254257',
		marginBottom: 20,
	},
	register: {
		fontSize: 20,
		fontWeight: 'bold',
		color: '#254257',
		marginBottom: 20,
	},
	input: {
		width: wp(78),
		height: 40,
		borderColor: '#fff',
		borderRadius: 20,
		paddingHorizontal: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.8,
		shadowRadius: 8,
		marginVertical: 10,
		color: '#ffff',
		backgroundColor: '#254257',
	},
	input1: {
		width: wp(56.5),
		height: 40,
		borderColor: '#fff',
		borderRadius: 20,
		paddingHorizontal: 10,
		marginVertical: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.8,
		shadowRadius: 8,
		color: '#fff',
		backgroundColor: '#254257',
	},
	fileInputWrapper: {
		width: wp(25),
		height: 100,
		borderColor: '#ccc',
	},
	logoInputWrapper: {
		width: 220,
		height: 100,
		justifyContent: 'center',
		alignItems: 'center',
		borderColor: '#ccc',
		marginBottom: 15,
	},
	fileInputIcon: {
		width: '100%',
		height: '100%',
	},
	logoicon: {
		width: 220,
		height: 100,
	},
	button: {
		width: 'auto',
		height: 'auto',
		backgroundColor: '#e5e5e5',
		borderRadius: 20,
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#254257',
		alignItems: 'center',
		padding: 10,
		marginVertical: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.8,
		shadowRadius: 8,
	},
	buttonText: {
		fontSize: 16,
		color: '#254257',
		fontWeight: 'bold',
	},
	errorText: {
		color: 'red',
		marginTop: 10,
	},
	loginLink: {
		width: 'auto',
		height: 'auto',
		backgroundColor: '#e5e5e5',
		borderRadius: 20,
		justifyContent: 'center',
		borderWidth: 2,
		borderColor: '#254257',
		alignItems: 'center',
		padding: 10,
		marginVertical: 10,
		elevation: 5,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.8,
		shadowRadius: 8,
	},
};

export default Register;
