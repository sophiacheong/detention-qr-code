import styles from "./page.module.css";
import { QRPage } from "./components/QrCode";

export default function Home() {
  return (
    <div className={styles.page}>
      <QRPage />
    </div>
  );
}
