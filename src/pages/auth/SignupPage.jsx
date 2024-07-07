import {
	Flex,
	Box,
	FormControl,
	FormLabel,
	Input,
	InputGroup,
	HStack,
	InputRightElement,
	Stack,
	Button,
	Heading,
	Text,
	useColorModeValue,
	Link
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useSetRecoilState } from "recoil";
// import authScreenAtom from "../atoms/authAtom";
import useShowToast from "../../hooks/useShowToast";
import userAtom from "../../atoms/userAtom";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {createUser} from '../../libs/Methods'

export default function SignupPage() {
	const [showPassword, setShowPassword] = useState(false);
	const [inputs, setInputs] = useState({
		name: "",
		username: "",
		email: "",
		password: "",
		photo: "null",
	});
	const navigate = useNavigate();

	const showToast = useShowToast();
	const setUser = useSetRecoilState(userAtom);

	const handleSignup = () => {
		createUser(inputs)
		.then(data => {
			console.log('User creation response:', data);
			if (data.status = 201) {
				navigate("/")
				localStorage.setItem("user_id", data.data[0]._id);
				showToast("Success", "User created successfully!", "success");
				setUser(data);
				console.log(data)
			} else {
				showToast("Error", data.error, "error");
			}
			console.log(data)
		})
		// .catch(error => {
		// 	console.error('Error creating user:', error);
		// 	showToast("Error", "Failed to create user. Please try again later.", "error");
		// });

	};

	return (
		<Flex align={"center"} justify={"center"}>
			<Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
				<Stack align={"center"}>
					<Heading fontSize={"4xl"} textAlign={"center"}>
						Sign up
					</Heading>
				</Stack>
				<Box rounded={"lg"} bg={useColorModeValue("white", "gray.dark")} boxShadow={"lg"} p={8}>
					<Stack spacing={4}>
						<HStack>
							<Box>
								<FormControl isRequired>
									<FormLabel>Full name</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
										value={inputs.name}
									/>
								</FormControl>
							</Box>
							<Box>
								<FormControl isRequired>
									<FormLabel>Username</FormLabel>
									<Input
										type='text'
										onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
										value={inputs.username}
									/>
								</FormControl>
							</Box>
						</HStack>
						<FormControl isRequired>
							<FormLabel>Email address</FormLabel>
							<Input
								type='email'
								onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
								value={inputs.email}
							/>
						</FormControl>
						<FormControl isRequired>
							<FormLabel>Password</FormLabel>
							<InputGroup>
								<Input
									type={showPassword ? "text" : "password"}
									onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
									value={inputs.password}
								/>
								<InputRightElement h={"full"}>
									<Button
										variant={"ghost"}
										onClick={() => setShowPassword((showPassword) => !showPassword)}
									>
										{showPassword ? <ViewIcon /> : <ViewOffIcon />}
									</Button>
								</InputRightElement>
							</InputGroup>
						</FormControl>
						<Stack spacing={10} pt={2}>
							<Button
								loadingText='Submitting'
								size='lg'
								bg={useColorModeValue("#E87B3DB2")}
								color={"white"}
								_hover={{
									bg: useColorModeValue("orange.medium"),
								}}
								onClick={handleSignup}
							>
								Sign up
							</Button>
						</Stack>
						<Stack pt={6}>
							<Text align={"center"}>
								Already a user?{" "}
								<Link as={RouterLink} color={"blue.400"} to='/login'>
									Login
								</Link>
							</Text>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Flex>
	);
}