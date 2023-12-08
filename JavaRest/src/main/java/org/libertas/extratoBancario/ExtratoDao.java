package org.libertas.extratoBancario;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.LinkedList;
import java.util.List;

public class ExtratoDao {
	public void inserir (Extrato ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "INSERT INTO extrato (nome, data_tr, conta, valor) VALUES (?, ?, ?, ?)";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getNome());
			prep.setString(2, ext.getData());
			prep.setString(3, ext.getConta());
			prep.setFloat(4, ext.getValor());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void alterar (Extrato ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "UPDATE extrato SET nome = ?, data_tr = ?, conta = ?, valor = ? WHERE id_extrato = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setString(1, ext.getNome());
			prep.setString(2, ext.getData());
			prep.setString(3, ext.getConta());
			prep.setFloat(4, ext.getValor());
			prep.setInt(5, ext.getId_extrato());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void excluir (Extrato ext) {
		Conexao con = new Conexao();
		
		try {
			String sql = "DELETE FROM extrato WHERE id_extrato = ?";
			PreparedStatement prep = con.getConnection().prepareStatement(sql);
			prep.setInt(1, ext.getId_extrato());
			prep.execute();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public Extrato consultar (int id) {
		Extrato ext = new Extrato();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM extrato WHERE id_extrato = " + id;
			Statement sta = con.getConnection().createStatement();
			ResultSet res = sta.executeQuery(sql);
			if (res.next()) {
				ext.setId_extrato(res.getInt("id_extrato"));
				ext.setNome(res.getString("nome"));
				ext.setData(res.getString("data_tr"));
				ext.setConta(res.getString("conta"));
				ext.setValor(res.getFloat("valor"));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return ext;
	}
	
	public List<Extrato> listar() {
		List<Extrato> lista = new LinkedList<Extrato>();
		Conexao con = new Conexao();
		
		try {
			String sql = "SELECT * FROM extrato ORDER BY id_extrato";
			Statement sta = con.getConnection().createStatement();
			ResultSet res = sta.executeQuery(sql);
			while (res.next()) {
				Extrato ext = new Extrato();
				ext.setId_extrato(res.getInt("id_extrato"));
				ext.setNome(res.getString("nome"));
				ext.setData(res.getString("data_tr"));
				ext.setConta(res.getString("conta"));
				ext.setValor(res.getFloat("valor"));
				lista.add(ext);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		con.desconectar();
		return lista;
	}
}
