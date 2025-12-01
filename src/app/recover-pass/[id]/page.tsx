"use client"

import styles from "./page.module.css";
import Home from "@/app/page";
import Loading from "@/components/ui/Loading";
import { Modal } from "@/components/ui/Modal";
import { useEffect, useState } from "react";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useParams } from "next/navigation";
import { useDecode } from "@/helpers/decodeToken/decodeJwt";
import { delay } from "@/helpers/delay/delay";
import { useToast } from "@/hooks/useToast";
import { apiPatch } from "@/lib/api/api-client";

export default function RecoverPassword() {
    const { decodeAndParseToken } = useDecode();
    const params = useParams();
    const token = String(params?.id);
    const userInfo = decodeAndParseToken(token);
    const { notifySuccess, notifyError } = useToast();
    console.log('userInfo... ', userInfo)

    const [RecoverPasswordIsOpen, RecoverPasswordSetIsOpen] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [RecoverPasswordModalBodyOption, RecoverPasswordSetModalBodyOption] = useState('Verificando...');
    const [RecoverPasswordIsLoading, RecoverPasswordSetIsLoading] = useState(false);
    const [verifyingText, setVerifyingText] = useState('Verificando solicitação de alteração de senha...')
    const [form, setForm] = useState({
        password: '',
        password2: '',
      });

      const fetchValidateToken = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL_INTERNAL_API}/validate-recover-pass-token`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  // Dados que você deseja enviar no corpo da requisição
                  token: token,
                }),
              });
            console.log('vem responseVem... ', response);
            if (response?.status != 200) {
                throw new Error('Unauthorized')
            }
            await delay(5000);
            RecoverPasswordSetIsLoading(false);
            RecoverPasswordSetModalBodyOption('Cadastre uma nova senha.')
        } catch (err: any) {
            const invalidToken = err?.message;
            await delay(5000);
            invalidToken == 'Unauthorized' && notifyError('Solicitação de recuperação de senha inválida!', 6000);
            RecoverPasswordSetIsLoading(false);
            setVerifyingText('Sua solicitação para troca de senha expirou, refaça a solicitação em "recuperar senha"')
        }
      }

    const RecoverPasswordSetIsOpenOnCloseModal = () => {
        RecoverPasswordSetIsOpen(false);
      }

    const handleCadastroFormInputs = (e: any) => {
        const { name, value } = e.target;
        setForm((prevform) => ({
          ...prevform,
          [name]: value,
        }))
      }

    const fetchNewPasswordToUpdate = async () => {
        if (form.password != form.password2) {
            return notifyError('Senha e confirmar senha devem ser iguais!')
        } else if (form.password.length < 8) {
            return notifyError('Senha deve ter no mínimo 8 caracteres!')
        }

        const update = {
            token,
            password: form.password
        }
        try {
            RecoverPasswordSetIsLoading(true);
            const result = await apiPatch(`/user/public/${userInfo.user_id}`, update);
            if(result?.status == 200) {
                await delay(3000);
                notifySuccess('Senha atualizada com sucesso!', 4000);
                RecoverPasswordSetModalBodyOption('Sucesso!');
                RecoverPasswordSetIsLoading(false);
            }
        } catch (err: any) {
            await delay(3000);
            notifyError('Você não possui uma solicitação para recadastrar sua senha, ou sua solicitação já expirou, refaça a solicitação!', 6000);
            RecoverPasswordSetIsLoading(false);
            RecoverPasswordSetIsOpenOnCloseModal();
        }
    }

    const NewPasswordModalBody = () => {
        return (
            <>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className={styles.passwordInput}>
                    <input type={ showPassword ? 'text' : 'password'} name="password" placeholder="Senha" onChange={handleCadastroFormInputs} />
                        <span
                        className={styles.eyeIcon}
                        onClick={() => setShowPassword((prev) => !prev)}
                        title={showPassword ? 'Esconder senha' : 'Mostrar senha'}
                        >
                        {showPassword ? <IoMdEyeOff /> : <IoMdEye />}
                        </span>
                    </div>
                    <input type={ showPassword ? 'text' : 'password'} name="password2" placeholder="Confirmar Senha" onChange={handleCadastroFormInputs} />
                    <br />
                    {!RecoverPasswordIsLoading ?
                        (<div className={styles.BtnsWraper}>
                        <div className={styles.Modal}>
                            <button onClick={() => fetchNewPasswordToUpdate()}>Enviar</button>
                        </div>
                        </div>) :
                        (
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}><Loading height={20} width={20} /></div>
                        )
                    }
            </div>

        </>
        );
    }

    const VerifyModalBody = () => {
        return(
            <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ textAlign: 'center' }}>{verifyingText}</p>
                    <div style={{ marginTop: '15px' }}>
                    { RecoverPasswordIsLoading && <Loading height={20} width={20} /> }
                    </div>
                    <div>
                    { !RecoverPasswordIsLoading &&
                        <div className={styles.BtnsWraper}>
                            <div className={styles.Modal}>
                                <button onClick={() => RecoverPasswordSetIsOpenOnCloseModal()}>Ok</button>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </>
        );
    }

    const SuccessChangePassword = () => {
        return(
            <>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <p style={{ textAlign: 'center' }}>Pronto... sua senha foi atualizada com sucesso! Agora você pode Entrar e fazer login com sua nova senha, cuide bem dela desta vez. 😊</p>
                    <div style={{ marginTop: '15px' }}>
                    { RecoverPasswordIsLoading && <Loading height={20} width={20} /> }
                    </div>
                    <div>
                    { !RecoverPasswordIsLoading &&
                        <div className={styles.BtnsWraper}>
                            <div className={styles.Modal}>
                                <button onClick={() => RecoverPasswordSetIsOpenOnCloseModal()}>Ok</button>
                            </div>
                        </div>
                    }
                    </div>
                </div>
            </>
        );
    }

    const renderRecoverPasswordModalBody = () => {
        switch (RecoverPasswordModalBodyOption) {
          case "Cadastre uma nova senha.":
            return NewPasswordModalBody;
        case "Sucesso!":
            return SuccessChangePassword;
          default:
            return VerifyModalBody;
        }
      };

    useEffect(() => {
        if(localStorage?.session){
            localStorage.removeItem('session');
        }
        RecoverPasswordSetIsLoading(true);
        fetchValidateToken();
    }, []);

    return (
        <>
            <Modal
                title={RecoverPasswordModalBodyOption}
                body={renderRecoverPasswordModalBody()}
                isOpen={RecoverPasswordIsOpen}
                onClose={RecoverPasswordSetIsOpenOnCloseModal}
              />
            <Home />
        </>
    );
}