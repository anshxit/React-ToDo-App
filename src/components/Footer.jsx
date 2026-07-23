function Footer({ clearAllTasks }) {
  return (
    <footer>
      <button className="clear-btn" onClick={clearAllTasks}>
        Clear All Tasks
      </button>
    </footer>
  );
}

export default Footer;