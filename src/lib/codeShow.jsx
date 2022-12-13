import { defineComponent } from 'vue'
import Prism from 'prismjs'
import 'prismjs/themes/prism-tomorrow.css'

export default defineComponent({
  name: 'CodeShow',
  props: {
    code: {
      type: String,
      required: true,
      default: ''
    },
    language: {
      type: String,
      required: true,
      default: 'html'
    },
    codeDynamic: {
      type: String,
      default: ''
    }
  },
  setup ({
    code,
    language
  }) {
    return () => (
      <div className="code">
        <pre>
          <code class={`language-${language}`}>
            {code}
          </code>
        </pre>
      </div>
    )
  },
  mounted () {
    Prism.highlightAll()
  }
})
