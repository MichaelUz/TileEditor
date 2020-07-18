export const changeTool = (tool) => {
    console.log('dispatching');
    return {
        type: 'CHANGE_TOOL',
        tool: tool
    }
}