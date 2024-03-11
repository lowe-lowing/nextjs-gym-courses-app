import mysql from "mysql2";

const db = mysql.createConnection({
  host: process.env.NEXT_PUBLIC_MYSQL_HOST as string,
  port: 3306,
  user: process.env.NEXT_PUBLIC_MYSQL_DATABASE as string,
  password: process.env.NEXT_PUBLIC_MYSQL_USER as string,
  database: process.env.NEXT_PUBLIC_MYSQL_PASSWORD as string,
});

export default async function excuteQuery({ query, values }: { query: string; values: string }) {
  try {
    const results = await db.promise().query(query, values);
    return results[0];
  } catch (error) {
    return { error };
  }
}
