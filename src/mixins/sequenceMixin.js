/**
 * Mixin chargé de gérer l'ajout de classes des components pour
 * les afficher au bon moment.
 * Prend en charger le passage à display none, pour
 */
//

const sequence = {
    data: () => ({
        arrivingClass: '',
        displayStyle: 'none'
    }),
    mounted () {
        if (this.currentState === 'current') this.displayStyle = 'block'
        this.$el.addEventListener('transitionend', this.onTransitionEnd)
        this.$el.addEventListener('animationend', this.onAnimationEnd)
    },
    watch: {
        currentState (newVal, oldVal) {
            if (newVal === 'current') {
                this.displayStyle = 'block'
                if (oldVal === 'past') {
                    this.arrivingClass = 'arriving-backward'
                } else {
                    this.arrivingClass = 'arriving-forward'
                }
            }
        }
    },

    methods: {
        onTransitionEnd() {
            if (this.currentState === 'past' || this.currentState === 'future') {
                this.displayStyle = 'none'
            }
        },
        onAnimationEnd() {
            if (this.currentState === 'current') {
                this.arrivingClass = ''
            }
        }
    }
}

export default sequence
