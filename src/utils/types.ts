export interface T_SelfEmployed {
    id: number;
    user_username: string;
    fio: string;
    inn: string | null;
    created_date: string;
    modification_date: string;
    completion_date: string | null;
    moderator_username: string;
    status: "draft" | "deleted" | "formed" | "completed" | "rejected";
  }



  export type T_SelfEmployedFilters = {
    start_date: string
    end_date: string
    status: string
}
  
  export type T_Activities = {

    id: number;
    title: string;
    description: string;
    img_url: string;
    category: string;
    status: "active" | "deleted";
  }


  export interface T_Activity {
    id: number;
    title: string;
    status: string;
    img_url: string;
    description: string;
    category: string;
  }
  




  export type T_ActivitiesListResponse = {
    activities: T_Activity[],
    self_employed_id: number,
    activity_count: number
}






export type T_LoginCredentials = {
  username: string
  password: string
}

// Типы данных для обновления
export interface T_UpdateUserData {
  username?: string;
  first_name?: string;
  last_name?: string;
  password?: string;  // если вы обновляете пароль
}




export type T_RegisterCredentials = {
  first_name: string
  last_name: string
  username: string
  password: string
}


export type T_User = {
  id: number
  first_name: string
  last_name: string
  is_authenticated: boolean
  validation_error: boolean
  validation_success: boolean
  checked: boolean
}



  
//   export interface SelfEmployedActivities {
//     /** ID */
//     id: number;
//     self_employed: SelfEmployed;
//     activities: Activities;
//     /** Главная деятельность */
//     importance: boolean;
//     /** Деятельность */
//     activity: number;
//   }
  
//   export interface UserLogin {
//     /**
//      * Username
//      * @minLength 1
//      */
//     username: string;
//     /**
//      * Password
//      * @minLength 1
//      */
//     password: string;
//   }
  
//   export interface UserRegister {
//     /** ID */
//     id: number;
//     /**
//      * Имя
//      * @maxLength 150
//      */
//     first_name: string;
//     /**
//      * Фамилия
//      * @maxLength 150
//      */
//     last_name: string;
//     /**
//      * Имя пользователя
//      * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
//      * @minLength 1
//      * @maxLength 150
//      * @pattern ^[\w.@+-]+$
//      */
//     username: string;
//     /**
//      * Пароль
//      * @minLength 1
//      * @maxLength 128
//      */
//     password: string;
//   }
  
//   export interface User {
//     /** ID */
//     id: number;
//     /**
//      * Адрес электронной почты
//      * @format email
//      * @maxLength 254
//      */
//     email: string;
//     /**
//      * Имя
//      * @maxLength 150
//      */
//     first_name: string;
//     /**
//      * Фамилия
//      * @maxLength 150
//      */
//     last_name: string;
//     /**
//      * Имя пользователя
//      * Обязательное поле. Не более 150 символов. Только буквы, цифры и символы @/./+/-/_.
//      * @minLength 1
//      * @maxLength 150
//      * @pattern ^[\w.@+-]+$
//      */
//     username: string;
//   }