package org.libertas.extratoBancario;

import java.sql.Connection;
import java.sql.DriverManager;

public class Conexao {
	private Connection connection;
	
	public Conexao () {
		try {
//			String url = "jdbc:mariadb://localhost:8081/ativprojectweb2023";
//			String user = "root";
//			String senha = "270590";
//			
//			Class.forName("org.mariadb.jdbc.Driver");
			
			
			String url = "jdbc:postgresql://localhost:5432/desenSisWeb";
			String user = "postgres";
			String senha = "123";
			
			Class.forName("org.postgresql.Driver");
			
			/*Properties info = new Properties();
			info.put("user", user);
			info.put("password", senha);*/
			this.connection = DriverManager.getConnection(url, user, senha);
			System.out.println("Conexão realizada com sucesso!");
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	public void desconectar() {
		try {
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public Connection getConnection() {
		return connection;
	}

	public void setConnection(Connection connection) {
		this.connection = connection;
	}
}
