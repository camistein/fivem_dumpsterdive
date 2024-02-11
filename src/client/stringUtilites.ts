import Settings  from "../shared/settings";
import Coords from "../shared/coords";

export const displayText = (text:string, coords: Coords, settings: Settings) => {
    BeginTextCommandDisplayText("STRING")

    SetDrawOrigin(coords.x, coords.y, coords.z + 1, 0);
	SetTextFont(settings.textStyle?.font ?? 1)
	SetTextProportional(false)

    if(!!settings.textStyle) {
        SetTextScale(settings.textStyle.scale, settings.textStyle.size)
        SetTextColour(settings.textStyle.color.red, settings.textStyle.color.green, settings.textStyle.color.blue, settings.textStyle.color.alpha)
        SetTextDropshadow(settings.textStyle.textDropShadow.distance,settings.textStyle.textDropShadow.red, settings.textStyle.textDropShadow.green, settings.textStyle.textDropShadow.blue, settings.textStyle.textDropShadow.alpha)
    }
    else {
        SetTextColour(255, 255, 255, 255)
        SetTextScale(0.0, 0.55)  
        SetTextDropshadow(0, 0, 0, 0, 255)
    }
    SetTextOutline()
	SetTextCentre(true)
	AddTextComponentString(text)
    DrawText(0.0, 0.0)
	ClearDrawOrigin()
    EndTextCommandDisplayText(coords.x, coords.y)
    
}

export const generateUniqueId = (id:number, x: number, y:number) => {
    return `${id}_${Math.floor(x)}_${Math.floor(y)}`
  }