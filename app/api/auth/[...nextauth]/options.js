import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from 'bcryptjs';
import Swal from 'sweetalert2'
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_URL;

console.log("Base Url: ",BASE_URL)

export const options = {
  session : {
    strategy : "jwt",
    maxAge : 2 * 24 * 60 * 60,
  },
  providers: [
    CredentialsProvider({
      
      name: 'Credentials',
      async authorize(credentials, req) {

        console.log("Credentials Mobile: ",credentials.mobile_number)
        console.log("Credentials Pass: ",credentials.password)

        if(credentials.user_id !== " " &&
          credentials.mobile_number !== " " && credentials.mobile_number !== undefined &&
          credentials.password !== " " &&
          credentials.hashPassword !== " " &&
          credentials.firstname !== " " &&
          credentials.lastname !== " " &&
          credentials.email !== " " &&
          credentials.created_date !== " " && credentials.user_role !== " ") {

            console.log("IF");

            const user_id = credentials.user_id;
            const mobile_number = credentials.mobile_number;
            const hashPassword = credentials.hashPassword;
            const firstname = credentials.firstname;
            const lastname = credentials.lastname;
            const email = credentials.email;
            const created_date = credentials.created_date;
            const delete_flag = credentials.delete_flag;
            const user_role = credentials.user_role;

            let results = await fetch(BASE_URL + "api/userApi",{

              method:"POST",
  
              body:JSON.stringify({user_id,
                mobile_number,
                hashPassword,
                firstname,
                lastname,
                email,
                created_date,delete_flag,user_role})
            });
            results = await results.json();
            console.log("Results: ",results)

            let user = results.result;
    
            console.log("User: ",user);

              if(user){
              
                const dbmobile_number = user.mobile_number;
                const dbpassword = user.hashPassword;
            
                const match = await bcrypt.compare(credentials.password, dbpassword);
            
                console.log("Match::::",match);
            
                if(match) {
                  console.log("Good Pass: ",user);
                  if(Object.keys(user).length > 0) {
                    user = { ...user, password: credentials.password };
                    return user
                  }else {
                    return null;
                  }
                  
                }
              };

          }else if(credentials.mobilenumber !== " " && credentials.mobilenumber !== undefined && credentials.password !== " " && credentials.password !== undefined){
            try{
              console.log("Else If::::::");

            const res = await fetch(BASE_URL + "api/userApi/findUser", {
              method: 'POST',
              body: JSON.stringify({"mobile_number" : credentials.mobilenumber}),
              headers: { "Content-Type": "application/json" }
            })
            const use = await res.json()
            let user = use.result;
    
            console.log("User: ",user);
      
            if (res.ok && user) {
              if(user){
              
                const dbmobile_number = user.mobile_number;
                const dbpassword = user.hashPassword;
            
                const match = await bcrypt.compare(credentials.password, dbpassword);
            
                console.log("Match::::",match);
            
                if(match) {
                  console.log("Good Pass: ",user);
                  if(Object.keys(user).length > 0) {
                    user = { ...user, password: credentials.password };
                    return user
                  }else {
                    return null;
                  }
                  
                }
              };
            }
            }catch(error) {
              const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                  toast.onmouseenter = Swal.stopTimer;
                  toast.onmouseleave = Swal.resumeTimer;
                }
              });
              Toast.fire({
                icon: "warning",
                title: "Incorrect otp entered"
              });
            }
            
          }else if(credentials.mob_num !== " " && credentials.mob_num !== undefined) {

            const res = await fetch(BASE_URL + "api/userApi/findUser", {
              method: 'POST',
              body: JSON.stringify({"mobile_number" : credentials.mob_num}),
              headers: { "Content-Type": "application/json" }
            })
            const use = await res.json()
            let user = use.result;
            user = { ...user, password: credentials.password };
            return user

          }else if(credentials.userID !== " " && credentials.password !== " " && credentials.user_role !== " ") {
            
            if(credentials.user_role === "admin") {

              const res = await fetch(BASE_URL + "api/userApi/findUser", {
                method: 'POST',
                body: JSON.stringify({"userID" : credentials.userID, "user_role" : "admin"}),
                headers: { "Content-Type": "application/json" }
              })
              const use = await res.json()
              let user = use.result;
      
              console.log("User: ",user);
        
              if (res.ok && user) {
                if(user){
                
                  const dbuserID = user.user_id;
                  const dbpassword = user.hashPassword;
              
                  const match = await bcrypt.compare(credentials.password, dbpassword);
              
                  console.log("Match::::",match);
              
                  if(match) {
                    console.log("Good Pass: ",user);
                    if(Object.keys(user).length > 0) {
                      user = { ...user, password: credentials.password };
                      return user
                    }else {
                      return null;
                    }
                    
                  }else{
                    return null;
                  }
                };
              }

            }

            if(credentials.user_role === "partner" && credentials.propCode) {

              const res = await fetch(BASE_URL + "api/userApi/findUser", {
                method: 'POST',
                body: JSON.stringify({"userID" : credentials.userID, "user_role" : "partner"}),
                headers: { "Content-Type": "application/json" }
              })
              const use = await res.json()
              let user = use.result;
      
              console.log("User: ",user);
        
              if (res.ok && user) {
                if(user){


                  const res = await fetch(BASE_URL + "api/userApi", {
                    method: 'POST',
                    body: JSON.stringify({"userID" : credentials.userID, "user_role" : "partner", operation : "updatePropCode", propCode : credentials.propCode}),
                    headers: { "Content-Type": "application/json" }
                  })
                  const use = await res.json()
                  console.log("Ressssss::::::::>",use.data_by_id)
                  user = use.data_by_id;

                
                  const dbuserID = user.user_id;
                  const dbpassword = user.hashPassword;
              
                  const match = await bcrypt.compare(credentials.password, dbpassword);
              
                  console.log("Match::::",match);
              
                  if(match) {
                    console.log("Good Pass: ",user);
                    if(Object.keys(user).length > 0) {
                      user = { ...user, password: credentials.password };
                      return user
                    }else {
                      return null;
                    }
                    
                  }else{
                    return null;
                  }
                };
              }

            }
            
          }else{
            return null
          }


      }
    })
  ],
  callbacks: {
    jwt: async ({token, user, session, trigger}) => {
      //console.log("jwt callback" ,{token, user, session, trigger})

      if(user) {
        token.user = user;
      }

      if(trigger === "update" && session?.favourites) {
        token.user.favourites = session.favourites
      }
      //console.log("jwt callback After" ,{token});
      return token;
    },
    session: async ({session, token, user}) => {
      if(token) {
        session.user = token.user;
      }
      return session;
    }
  },
  pages: {
    signIn: "/login",
  },
  secret: '42dfd79ba11db84510c34d938d32987171bb48a4e8b1c533928286a8f497fda6',
    
}

export default NextAuth(options)