import { FormControlLabel, FormGroup } from '@mui/material'
import { IOSSwitch } from '../elements/SwitchItem'

export default function SwitchProvider({ is_active, handleActive }) {
    console.log(is_active)
    return (
        <>
            {
                is_active == 0 ? <FormGroup>
                    <FormControlLabel
                        control={
                            <IOSSwitch title={"تفعيل لمزود"} sx={{ m: 1 }} onChange={e => handleActive(e)} />
                        }
                    />

                </FormGroup>
                    :
                    <FormGroup>
                        <FormControlLabel
                            control={
                                <IOSSwitch title={"تعطيل المزود"} sx={{ m: 1 }} defaultChecked onChange={e => handleActive(e)} />
                            }
                        />

                    </FormGroup>
            }
        </>
    )
}
