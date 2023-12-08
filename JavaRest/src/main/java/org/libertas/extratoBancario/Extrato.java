package org.libertas.extratoBancario;

public class Extrato {
	private int id_extrato;
	private float valor;
	private String data_tr, nome, conta;
	
	public int getId_extrato() {
		return id_extrato;
	}
	public void setId_extrato(int id_extrato) {
		this.id_extrato = id_extrato;
	}
	public float getValor() {
		return valor;
	}
	public void setValor(float valor) {
		this.valor = valor;
	}
	public String getData() {
		return data_tr;
	}
	public void setData(String data_tr) {
		this.data_tr = data_tr;
	}
	public String getNome() {
		return nome;
	}
	public void setNome(String nome) {
		this.nome = nome;
	}
	public String getConta() {
		return conta;
	}
	public void setConta(String conta) {
		this.conta = conta;
	}
}
