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
        onTransitionEnd(e) {
            if (e.target === this.$el && (this.currentState === 'past' || this.currentState === 'future')) {
                this.displayStyle = 'none'
                this.$emit('finished-exit')
                this.$emit('finished-transition')
            }
        },
        onAnimationEnd() {
            if (this.currentState === 'current') {
                this.arrivingClass = ''
                this.$emit('finished-enter')
                this.$emit('finished-transition')
            }
        },
        onWheelChangeSlide (e) {
            if (e.deltaY > 0) {
                this.$emit('next-slide')
            } else if (e.deltaY < 0) {
                this.$emit('prev-slide')
            }
        }
    }
}

export default sequence
