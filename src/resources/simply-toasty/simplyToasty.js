export default class simplyToasty {

    constructor() {

        this.overlay = document.getElementById('simply_toasty_overlay');
        this.toastClass = 'default-toast';
        this.toastSuccess = 'default-success';
        this.toastInfo = 'default-info';
        this.toastError = 'default-error';

        this.positions = {
            topLeft: 'top-left',
            topCenter: 'top-center',
            topRight: 'top-right',
            centerLeft: 'center-left',
            centerCenter: 'center-center',
            centerRight: 'center-right',
            bottomLeft: 'bottom-left',
            bottomCenter: 'bottom-center',
            bottomRight: 'bottom-right'
        };


        this.initialize();

    }

    initialize() {


        if (this.overlay) {
            console.log('initialzed toasty already');
            return;
        }

        const simplyToastyOverlay = document.createElement("div");
        simplyToastyOverlay.id = 'simply_toasty_overlay';
        this.overlay = simplyToastyOverlay;

        document.body.append(simplyToastyOverlay);

        console.log('initialzed toasty');

    }

    addMessage(message = "default message", type = 'success', duration, customClass) {
        const classTypes = {
            success: this.toastSuccess,
            error: this.toastError,
            info: this.toastInfo,
        };

        const toastTypeClass = classTypes[type] || this.toastInfo;

        const toast = document.createElement('div');
        toast.classList.add(this.toastClass, customClass || toastTypeClass);
        this.overlay.appendChild(toast);


        toast.innerText = message;


        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, duration);
    }


    setPosition(position) {
        this.overlay.className = position;
    }

    setFlexDirection(direction = 'column') {
        this.overlay.style.flexDirection = direction;
    }

    setToastClass(className) {
        this.toastClass = className;
    }

    setToastSuccess(className) {
        this.toastSuccess = className;
    }

    setToastInfo(className) {
        this.toastInfo = className;
    }

    setToastError(className) {
        this.toastError = className;
    }

}

