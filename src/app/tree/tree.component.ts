import {
  Component,
  Input,
  OnChanges,
  signal,
  SimpleChanges,
} from '@angular/core';
import { TreeNode } from '../interfaces/tree-node.interface';
import { TREE_NODES } from '../data/tree-data';

@Component({
  selector: 'app-tree',
  standalone: true,
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
})
export class TreeComponent implements OnChanges {
  @Input() children: TreeNode[] = [];
  @Input() showId: boolean = false;
  @Input() isExpandAllButton: boolean = false;

  nodesSignal = signal<TreeNode[]>(this.deepCopy(TREE_NODES));

  ngOnChanges(changes: SimpleChanges) {
    if (changes['children'] && changes['children'].currentValue) {
      this.nodesSignal.set(this.deepCopy(changes['children'].currentValue));
    }
  }

  toggleNode(node: TreeNode) {
    node.isExpanded = !node.isExpanded;
  }

  handleNodeClick(node: TreeNode) {
    if (!this.isExpandAllButton) {
      console.log(`нажали на узел ID ${node.id}`);
    } else {
      this.expandNodeRecursively(node);
    }
  }

  private expandNodeRecursively(node: TreeNode) {
    node.isExpanded = true;
    node.children.forEach((child) => this.expandNodeRecursively(child));
  }

  private deepCopy(nodes: TreeNode[]): TreeNode[] {
    return nodes.map((node) => ({
      ...node,
      children: this.deepCopy(node.children),
      isExpanded: node.isExpanded ?? false,
    }));
  }
}
