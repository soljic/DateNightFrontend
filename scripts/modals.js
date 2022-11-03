let [modalOpen, setModalOpen] = useState(false);

function closeModal() {
  setModalOpen(false);
}

function maybeOpenModal() {
  const date = new Date();

  const start = new Date("2022-10-31");
  const end = new Date("2022-11-02");

  // show modal only in selected range
  if (!(date > start && date < end)) {
    return;
  }

  const ms = localStorage.getItem("modal_status");
  if (!ms) {
    localStorage.setItem("modal_status", JSON.stringify({ dt: new Date() }));
    gtagPageView({
      title: "MemWalk Banner",
      location: "/",
    });
    setModalOpen(true);
    return;
  }

  const dt = JSON.parse(ms)?.dt;
  if (dt) {
    const diff = Math.abs(new Date() - new Date(dt));
    // if diff > 8hrs, rounded down
    if (Math.floor(diff / 1000 / 3600) > 8) {
      localStorage.setItem("modal_status", JSON.stringify({ dt: new Date() }));
      gtagPageView({
        title: "MemWalk Banner",
        location: "/",
      });
      setModalOpen(true);
    }
  }
}

useEffect(() => {
  const timer = setTimeout(() => {
    maybeOpenModal();
  }, 2500);
  return () => clearTimeout(timer);
}, []);
