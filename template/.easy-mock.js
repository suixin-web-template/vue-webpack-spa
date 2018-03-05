/**
 * Created by liubingwen on 2017/12/6.
 */
module.exports = {
  host: 'http://192.168.3.117:7300',
  output: 'src/api', // 产出到项目下的 api 目录，不用手动创建
  template: 'Estelle00/easy-mock-templates-axios', // 基于 easy-mock-templates 提供的 axios 模板
  projects: [{{#easymock}}{id: '{{id}}', name: '{{id}}'}{{/easymock}}]
}
