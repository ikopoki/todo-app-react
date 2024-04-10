const AppHeader = () => {
  const easter = () => {
    throw new Error('My name is easter egg');
  };

  return (
    <header>
      <h1 onClick={easter}>todos</h1>
    </header>
  );
};

export default AppHeader;
