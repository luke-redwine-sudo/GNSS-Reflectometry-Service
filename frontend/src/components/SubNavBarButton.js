import './components_css/SubNavBar.css'

function SubNavBarButton(props) {
    return (
        <button class="subnavbarbutton" onClick={props.handleClick}>{props.label}</button>
    );
}

export default SubNavBarButton