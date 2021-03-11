// base64 image convertor
export const getBase64Image = (img: any) => {
    let canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    let ctx = canvas.getContext("2d");
    if (ctx)
        ctx.drawImage(img, 0, 0, img.width, img.height);

    let dataURL = canvas.toDataURL("image/png");
    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

// profile storage handler
export const handleProfileStorage = (profile: string) => {
    let profileImage = document.getElementById('profileImg');
    let imgData = getBase64Image(profileImage);
    localStorage.setItem(profile, imgData);
}

export default handleProfileStorage;
