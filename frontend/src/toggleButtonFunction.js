

function toggleButtonFunction(dropDownMenu, toggleBtnIcon) {
    return (
        dropDownMenu.classList.toggle("open");
        const isOpen = dropDownMenu.classList.contains("open");
        toggleBtnIcon.classList = isOpen ? "fa-solid fa-xmark" : "fa-solid fa-bars";
    );
}
