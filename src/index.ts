import Plugin from '@jbrowse/core/Plugin'
import PluginManager from '@jbrowse/core/PluginManager'
import ViewType from '@jbrowse/core/pluggableElementTypes/ViewType'
import { version } from '../package.json'
import {
  ReactComponent as HelloViewReactComponent,
  stateModel as helloViewStateModel,
} from './HelloView'

export default class MyProjectPlugin extends Plugin {
  name = 'MyProject'
  version = version

  install(pluginManager: PluginManager) {
    pluginManager.addViewType(() => {
      return new ViewType({
        name: 'HelloView',
        stateModel: helloViewStateModel,
        ReactComponent: HelloViewReactComponent,
      })
    })
  }

  configure(pluginManager: PluginManager) {
    //@ts-ignore
    ;(async () => {
      try {
        pluginManager.rootModel?.setDefaultSession?.()

        // add view, make typescript happy with return type
        const view = pluginManager.rootModel?.session?.addView(
          'SpreadsheetView',
          {},
        ) as
          | {
              importWizard: {
                setFileType: Function
                setSelectedAssemblyName: Function
                setFileSource: Function
                import: Function
              }
            }
          | undefined

        if (!view) {
          throw new Error('Failed to initialize view')
        }

        // manually run through the import wizard steps
        view.importWizard.setFileType('BED')
        view.importWizard.setSelectedAssemblyName('hg19')
        view.importWizard.setFileSource({
          uri:
            'https://s3.amazonaws.com/jbrowse.org/genomes/hg19/skbr3/reads_lr_skbr3.fa_ngmlr-0.2.3_mapped.bam.sniffles1kb_auto_l8_s5_noalt.new.vcf',
          locationType: 'UriLocation',
        })
        view.importWizard.import('hg19')
      } catch (e) {
        console.error(e)
      }
    })()
  }
}
