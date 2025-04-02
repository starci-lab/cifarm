import { Text, TextColor } from "../../elements"
import { SizerBaseConstructorParams } from "../../../types"
import { Sizer } from "phaser3-rex-plugins/templates/ui/ui-components"
import { formatTime, getNextMinuteCronExecution } from "@/modules/common"

export class StandNextDeliverTime extends Sizer {
    private nextDeliverTimeText: Text
    private timeText: Text
    private nextDeliverTimeinterval: NodeJS.Timeout | undefined 
    
    //secondly update
    private updateNextDeliverTime() {
        const diff = getNextMinuteCronExecution() 
        this.timeText.setText(formatTime(diff))
    }

    private updateNextDeliverTimeSecondly() {
        this.updateNextDeliverTime()
        this.nextDeliverTimeinterval = setInterval(() => {
            try {
                this.updateNextDeliverTime()
            } catch (error) {
                console.error(error)
            }
        }, 1000)
    }

    constructor({ scene, config }: SizerBaseConstructorParams) {
        super(scene, {
            ...config,
            orientation: "y",
            space: {
                item: 40,
            }
        })

        this.nextDeliverTimeText = new Text({
            baseParams: {
                scene,
                x: 0,
                y: 0,
                text: "Next deliver time",
            },
            options: {
                fontSize: 40,
                textColor: TextColor.White,
            }
        })
        this.scene.add.existing(this.nextDeliverTimeText)
        this.add(this.nextDeliverTimeText)

        this.timeText = new Text({
            baseParams: {
                scene,
                x: 0,
                y: 0,
                text: "",
            },
            options: {
                fontSize: 56,
                textColor: TextColor.White,
            }
        })
        this.scene.add.existing(this.timeText)
        this.add(this.timeText)

        this.layout()

        // set timeout to update next deliver time
        this.updateNextDeliverTimeSecondly()
    }
}