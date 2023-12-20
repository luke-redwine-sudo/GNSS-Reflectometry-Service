import './components_css/SubNavBar.css'

function SubNavBarButton(props) {
    return (
        <button class="subnavbarbutton">{props.label}</button>
    );
}

export default SubNavBarButton