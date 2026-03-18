package v1alpha1

import (
	"context"

	"github.com/grafana/grafana-app-sdk/resource"
	metav1 "k8s.io/apimachinery/pkg/apis/meta/v1"
)

type EngagementEventClient struct {
	client *resource.TypedClient[*EngagementEvent, *EngagementEventList]
}

func NewEngagementEventClient(client resource.Client) *EngagementEventClient {
	return &EngagementEventClient{
		client: resource.NewTypedClient[*EngagementEvent, *EngagementEventList](client, Kind()),
	}
}

func NewEngagementEventClientFromGenerator(generator resource.ClientGenerator) (*EngagementEventClient, error) {
	c, err := generator.ClientFor(Kind())
	if err != nil {
		return nil, err
	}
	return NewEngagementEventClient(c), nil
}

func (c *EngagementEventClient) Get(ctx context.Context, identifier resource.Identifier) (*EngagementEvent, error) {
	return c.client.Get(ctx, identifier)
}

func (c *EngagementEventClient) List(ctx context.Context, namespace string, opts resource.ListOptions) (*EngagementEventList, error) {
	return c.client.List(ctx, namespace, opts)
}

func (c *EngagementEventClient) ListAll(ctx context.Context, namespace string, opts resource.ListOptions) (*EngagementEventList, error) {
	resp, err := c.client.List(ctx, namespace, resource.ListOptions{
		ResourceVersion: opts.ResourceVersion,
		Limit:           opts.Limit,
		LabelFilters:    opts.LabelFilters,
		FieldSelectors:  opts.FieldSelectors,
	})
	if err != nil {
		return nil, err
	}
	for resp.GetContinue() != "" {
		page, err := c.client.List(ctx, namespace, resource.ListOptions{
			Continue:        resp.GetContinue(),
			ResourceVersion: opts.ResourceVersion,
			Limit:           opts.Limit,
			LabelFilters:    opts.LabelFilters,
			FieldSelectors:  opts.FieldSelectors,
		})
		if err != nil {
			return nil, err
		}
		resp.SetContinue(page.GetContinue())
		resp.SetResourceVersion(page.GetResourceVersion())
		resp.SetItems(append(resp.GetItems(), page.GetItems()...))
	}
	return resp, nil
}

func (c *EngagementEventClient) Create(ctx context.Context, obj *EngagementEvent, opts resource.CreateOptions) (*EngagementEvent, error) {
	// Make sure apiVersion and kind are set
	obj.APIVersion = GroupVersion.Identifier()
	obj.Kind = Kind().Kind()
	return c.client.Create(ctx, obj, opts)
}

func (c *EngagementEventClient) Update(ctx context.Context, obj *EngagementEvent, opts resource.UpdateOptions) (*EngagementEvent, error) {
	return c.client.Update(ctx, obj, opts)
}

func (c *EngagementEventClient) Patch(ctx context.Context, identifier resource.Identifier, req resource.PatchRequest, opts resource.PatchOptions) (*EngagementEvent, error) {
	return c.client.Patch(ctx, identifier, req, opts)
}

func (c *EngagementEventClient) UpdateStatus(ctx context.Context, identifier resource.Identifier, newStatus Status, opts resource.UpdateOptions) (*EngagementEvent, error) {
	return c.client.Update(ctx, &EngagementEvent{
		TypeMeta: metav1.TypeMeta{
			Kind:       Kind().Kind(),
			APIVersion: GroupVersion.Identifier(),
		},
		ObjectMeta: metav1.ObjectMeta{
			ResourceVersion: opts.ResourceVersion,
			Namespace:       identifier.Namespace,
			Name:            identifier.Name,
		},
		Status: newStatus,
	}, resource.UpdateOptions{
		Subresource:     "status",
		ResourceVersion: opts.ResourceVersion,
	})
}

func (c *EngagementEventClient) Delete(ctx context.Context, identifier resource.Identifier, opts resource.DeleteOptions) error {
	return c.client.Delete(ctx, identifier, opts)
}
