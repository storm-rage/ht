export default function translateDataToTree(data) {
  let parents = data.filter(value => value.parentId == 'undefined' || value.parentId == null)
  let children = data.filter(value => value.parentId !== 'undefined' && value.parentId != null)
  let translator = (parents, children) => {
    parents.forEach((parent) => {
        children.forEach((current, index) => {
            if (current.parentId === parent.id) {
              let temp = JSON.parse(JSON.stringify(children))
              temp.splice(index, 1)
              translator([current], temp)
              typeof parent.children !== 'undefined' ? parent.children.push(current) : parent.children = [current]
            }
          }
        )
      }
    )
  }
  translator(parents, children)

  return parents
}
