'use server';

import jwt from 'jsonwebtoken';

export async function signToken(payload: any) {
  try {
    // Usar a mesma chave secreta que o backend
    const token = jwt.sign(
      payload, 
      process.env.JWT_SECRET_KEY!, 
      { expiresIn: '5m' }
    );
    
    return { success: true, token };
  } catch (error) {
    console.error('Erro ao assinar token:', error);
    return { success: false, error: 'Falha ao assinar token' };
  }
}