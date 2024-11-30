import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import {T_LoginCredentials, T_RegisterCredentials, T_User} from "src/utils/types.ts";
import {AsyncThunkConfig} from "@reduxjs/toolkit/dist/createAsyncThunk";
import {AxiosResponse} from "axios";
import { api } from "../api";
import { useSelector } from 'react-redux';
import { RootState } from "../store";





const initialState: T_User = {
	id: -1,
	first_name: "",
	last_name: "",
	is_authenticated: false,
    validation_error: false,
    validation_success: false,
    checked: false
}

export const handleCheck = createAsyncThunk<T_User, object, AsyncThunkConfig>(
    "check",
    async function() {
        const storedUser = localStorage.getItem('user');
        console.log('user', storedUser);
        
        
        if (storedUser) {
            // Если данные есть в localStorage, возвращаем их
            return JSON.parse(storedUser);
        }
        
        // Если данных нет, отправляем запрос на сервер
        const response = await api.user.userLoginCreate({}) as AxiosResponse<T_User>;
        return response.data;
    }
);


export const handleLogin = createAsyncThunk<T_User, object, AsyncThunkConfig>(
    "login",
    async function({ username, password }: T_LoginCredentials) {


        const response = await api.user.userLoginCreate(
            {
                username,
                password
            },
        ) as AxiosResponse<T_User>;
        console.log(response.data.user);
        localStorage.setItem('user', JSON.stringify(response.data.user))
        

        return response.data.user;
    }
);

export const handleRegister = createAsyncThunk<T_User, object, AsyncThunkConfig>(
    "register",
    async function({username,first_name, last_name,  password}:T_RegisterCredentials) {
        const response = await api.user.userRegisterCreate({
            username,
            first_name,
            last_name,
            password
        }) as AxiosResponse<T_User>

        return response.data
    }
)

export const handleLogout = createAsyncThunk<void, object, AsyncThunkConfig>(
    "logout",
    async function() {
        await api.user.userLogoutCreate()
        // Удаляем данные пользователя из localStorage
        localStorage.removeItem('user');

        
    }
)

export const handleUpdateProfile = createAsyncThunk<T_User, object, AsyncThunkConfig>(
    "updateProfile",
    async function(userData:T_RegisterCredentials, thunkAPI) {
        const state = thunkAPI.getState()
        const {username, first_name, last_name, password} = userData
        const response = await api.user.userUpdateUpdate(state.user.id, {
            username,
            first_name,
            last_name,
            password
        }) as AxiosResponse<T_User>

        return response.data
    }
)


const userlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
        setValidationError: (state, action) => {
            state.validation_error = action.payload
        }
	},
    extraReducers: (builder) => {
        builder.addCase(handleLogin.fulfilled, (state:T_User, action: PayloadAction<T_User>) => {
            state.is_authenticated = true
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
        });
        builder.addCase(handleRegister.fulfilled, (state:T_User, action: PayloadAction<T_User>) => {
            state.is_authenticated = true
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
         
        });
        builder.addCase(handleLogout.fulfilled, (state:T_User) => {
            state.is_authenticated = false
            state.id = -1
            state.username = ""
            state.first_name = ""
            state.last_name = ""
            state.validation_error = false
        });
        builder.addCase(handleCheck.fulfilled, (state:T_User, action: PayloadAction<T_User>) => {
            state.is_authenticated = true
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.checked = true
        });
        builder.addCase(handleCheck.rejected, (state:T_User) => {
            state.is_authenticated = false
            state.id = -1
            state.username = ""
            state.first_name = ""
            state.last_name = ""
            state.validation_error = false
            state.checked = true
        });
        builder.addCase(handleUpdateProfile.fulfilled, (state:T_User, action: PayloadAction<T_User>) => {
            state.id = action.payload.id
            state.username = action.payload.username
            state.first_name = action.payload.first_name
            state.last_name = action.payload.last_name
            state.validation_error = false
            state.validation_success = true
        });
        builder.addCase(handleUpdateProfile.rejected, (state:T_User) => {
            state.validation_error = true
            state.validation_success = false
        });
    }
})


export const useF= () => useSelector((state: RootState) => state.user.first_name );


export const {setValidationError} = userlice.actions

export default userlice.reducer