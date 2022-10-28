import styled from "styled-components";

import {Logo} from "../Navbar"
export function FormRegister (){
    const handleSubmit= ()=>{

    }
    return(
       <form onSubmit={handleSubmit} autoComplete="off">
            <RegisterContainer>
                
                <div>
                    <Logo>PedirYa</Logo>
                </div>
                <InputRegister>
                Nombre:
                <input 
                className="input__name"
                placeholder="Nombre"
                name="name"
                type="name"
                />
                </InputRegister>
                <InputRegister>
                Apellido: 
                <input 
                className="input__name"
                placeholder="Apellido"
                name="lastname"
                type="lastname"
                />
                </InputRegister>
                <InputRegister>
                Email: 
                    <input 
                    className="input__name"
                    name="email"
                    type="email"
                    placeholder="Email"
                    />
                </InputRegister>
                <InputRegister>
                Password: 
                <input 
                className="input__name"
                 name="password"
                 type="password"
                 placeholder="Password"/>
                </InputRegister>
                <InputRegister>
                Repetir password:
                <input  
                className="input__name"
                name="repeatpassword"
                    type="repeatpassword"
                    placeholder="Repeat Password"/>
                </InputRegister>
                <ButtonRegister>
                    <button type="submit" className="btn__primary">Register</button>
                </ButtonRegister>
                
            </RegisterContainer>
           </form> 
       
    )
}

const RegisterContainer = styled.div`
    position:relative;
    width: 450px;
    height: 600px;
    align-items:center;
    align-content:center;
    transition: all .2s ease;
    box-shadow: 3px 3px 20px ${({ theme }) => theme.secondary};
    border-radius: 15px;
    display:flex;
    flex-flow:column;
    border: 3px ${({ theme }) => theme.secondary} solid;
    justify-content: space-evenly;
   
    
    font-size:17px;
`
const InputRegister = styled.div`

justify-content:space-between;
width: 400px;

.input__name{
    border:none;
    font-size: 18px;
    margin-left:5px
  }
`

const ButtonRegister = styled.div`
.btn__primary{
    font-size: 18px;
    border:none;
    border-radius:5px;
    cursor:pointer;
    width:140px;
    height:50px;
    background-color:${({ theme }) => theme.primary};
  }
`